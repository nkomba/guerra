/* ==========================================================================
   storage.js — authenticated photo uploads to the family-photos bucket
   --------------------------------------------------------------------------
   File uploads require sign-in (this is deliberate: anonymous file uploads are
   an abuse risk, and family photos can show living people). So this uploader
   only appears when there is an active Supabase session. Everyone else uses
   the ordinary "describe the photo" form + email, which stays available.

   What it does when a signed-in family member picks a file and clicks upload:
     1. uploads to   family-photos/<your-user-id>/<timestamp>-<filename>
        (matches the Storage RLS policy: you may only write your own folder)
     2. records a row in the `photos` table (is_approved = false)
     3. the curator later reviews it and, if suitable and not sensitive,
        publishes it to the public-photos bucket for display.

   It mounts itself into #photo-upload-slot on the Contribute page if present.
   ========================================================================== */
(function () {
  "use strict";

  var DB = window.GuerraDB;
  if (!DB || !DB.ready) return;                       // backend off → nothing to do
  var slot = document.getElementById("photo-upload-slot");
  if (!slot) return;                                  // only on the photo form

  DB.session().then(function (session) {
    if (!session) {
      slot.innerHTML =
        '<div class="note"><strong>Signed-in family members can upload photos here.</strong> ' +
        'If you have an account, <a href="admin.html">sign in</a> first. Otherwise, describe the ' +
        'photo above and email it — that works for everyone.</div>';
      return;
    }
    mountUploader(session.user.id);
  });

  function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}

  function mountUploader(uid) {
    slot.innerHTML =
      '<div class="form-card" style="margin-top:1rem;background:var(--forest-soft)">' +
      '<h3 class="mt-0">Upload the image file (signed in)</h3>' +
      '<div class="field"><label for="pu-file">Choose a photo or scan <span class="req">*</span></label>' +
      '<input id="pu-file" type="file" accept="image/*"></div>' +
      '<div class="field"><label for="pu-caption">Caption</label>' +
      '<input id="pu-caption" placeholder="e.g. Wedding of Carlos &amp; Beatriz, about 1935"></div>' +
      '<label style="display:flex;gap:.5rem;align-items:flex-start;font-size:.9rem">' +
      '<input id="pu-living" type="checkbox" style="width:auto;margin-top:.3rem">' +
      '<span>This photo shows a living person (keep it private until reviewed)</span></label>' +
      '<div class="btn-row" style="margin-top:1rem"><button class="btn btn--forest" id="pu-btn" type="button">Upload photo</button></div>' +
      '<div class="form-status" id="pu-status"></div></div>';

    var btn = document.getElementById("pu-btn");
    var status = document.getElementById("pu-status");
    function say(msg, ok) { status.className = "form-status is-visible" + (ok === false ? "" : " form-status--ok"); status.innerHTML = msg; }

    btn.addEventListener("click", function () {
      var fileEl = document.getElementById("pu-file");
      var file = fileEl.files && fileEl.files[0];
      if (!file) { say("Please choose an image file first.", false); return; }
      if (file.size > 15 * 1024 * 1024) { say("That file is larger than 15&nbsp;MB — please choose a smaller image.", false); return; }

      btn.disabled = true; btn.textContent = "Uploading…";
      var safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      var path = uid + "/" + Date.now() + "-" + safeName;

      DB.client.storage.from("family-photos").upload(path, file, { upsert: false, contentType: file.type })
        .then(function (up) {
          if (up.error) throw up.error;
          // record metadata (RLS: submitted_by must equal the signed-in user)
          return DB.client.from("photos").insert([{
            bucket_id: "family-photos",
            storage_path: path,
            caption: (document.getElementById("pu-caption").value || "").trim() || null,
            living_sensitive: document.getElementById("pu-living").checked,
            is_public: false,
            is_approved: false,
            submitted_by: uid
          }]);
        })
        .then(function (ins) {
          btn.disabled = false; btn.textContent = "Upload photo";
          if (ins && ins.error) throw ins.error;
          say("<strong>Uploaded — thank you!</strong> Your photo is stored privately and is waiting for the curator to review it. It won't be shown publicly until approved.");
          document.getElementById("pu-file").value = "";
          document.getElementById("pu-caption").value = "";
        })
        .catch(function (err) {
          btn.disabled = false; btn.textContent = "Upload photo";
          say("<strong>Upload failed.</strong> " + esc((err && err.message) || "Please try again, or email the photo instead.") , false);
        });
    });
  }
})();
