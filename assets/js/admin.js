/* ==========================================================================
   admin.js — the curator's private moderation dashboard (admin.html)
   --------------------------------------------------------------------------
   • Requires Supabase to be configured (assets/js/supabase-config.js).
   • The curator logs in with the email/password you create in Supabase
     (Authentication → Users). Only a signed-in user can read or moderate
     submissions — Row Level Security enforces this on the server too.
   • Review pending contributions, tidy the wording, set an evidence label,
     then Approve (publishes approved stories to the public feed) or Reject.
   ========================================================================== */
(function () {
  "use strict";

  var DB = window.GuerraDB || { ready: false };
  var $ = function (id) { return document.getElementById(id); };

  var loginView = $("login-view"), dashView = $("dash-view"), notReady = $("not-configured");

  if (!DB.ready) { if (notReady) notReady.hidden = false; return; }
  var client = DB.client;

  var TYPE_LABEL = { story: "Story", photo: "Photo / document", correction: "Correction", new_person: "New relative", lead: "Research lead" };
  var EV = ["confirmed", "likely", "unverified", "tradition"];
  var currentFilter = "pending";
  var currentUid = null;     // set once signed in — stamped as reviewed_by
  var isCurator = false;     // whether this account is marked curator in profiles

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function show(view) {
    loginView.hidden = view !== "login";
    dashView.hidden = view !== "dash";
  }

  // ---- session ------------------------------------------------------
  function onSignedIn(session) {
    currentUid = session && session.user ? session.user.id : null;
    show("dash");
    verifyCurator().then(load);
  }
  client.auth.getSession().then(function (r) {
    if (r && r.data && r.data.session) onSignedIn(r.data.session); else show("login");
  }, function () { show("login"); });
  client.auth.onAuthStateChange(function (_e, session) {
    if (session) onSignedIn(session); else show("login");
  });

  // Confirm this account is marked as the curator; warn clearly if not.
  function verifyCurator() {
    var banner = $("curator-banner");
    return client.from("profiles").select("role").eq("id", currentUid).maybeSingle().then(function (r) {
      isCurator = !!(r && r.data && r.data.role === "curator");
      if (banner) {
        if (isCurator) { banner.hidden = true; }
        else {
          banner.hidden = false;
          banner.innerHTML = "<strong>This account isn't marked as a curator yet.</strong> You'll only see your own submissions until it is. " +
            "In Supabase, run: <code>update public.profiles set role='curator' where id='" + (currentUid || "&lt;your-user-id&gt;") + "';</code> then reload.";
        }
      }
    }, function () { /* profiles not reachable — leave banner as-is */ });
  }

  // ---- login / logout ----------------------------------------------
  $("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var err = $("login-error"); err.hidden = true;
    var btn = $("login-btn"); btn.disabled = true; btn.textContent = "Signing in…";
    client.auth.signInWithPassword({ email: $("login-email").value.trim(), password: $("login-password").value })
      .then(function (r) {
        btn.disabled = false; btn.textContent = "Sign in";
        if (r.error) { err.textContent = r.error.message; err.hidden = false; }
      });
  });
  $("signout").addEventListener("click", function () { client.auth.signOut(); });

  // ---- filters ------------------------------------------------------
  Array.prototype.forEach.call(document.querySelectorAll(".filter-btn"), function (b) {
    b.addEventListener("click", function () {
      currentFilter = b.dataset.filter;
      Array.prototype.forEach.call(document.querySelectorAll(".filter-btn"), function (x) {
        x.setAttribute("aria-selected", x === b ? "true" : "false");
      });
      load();
    });
  });

  // ---- load & render ------------------------------------------------
  function load() {
    var list = $("subs"); list.innerHTML = '<p class="muted">Loading…</p>';
    var q = client.from("submissions").select("*").order("created_at", { ascending: false });
    if (currentFilter !== "all") q = q.eq("status", currentFilter);
    q.then(function (r) {
      if (r.error) { list.innerHTML = '<div class="note">Could not load submissions: ' + esc(r.error.message) + "</div>"; return; }
      $("count").textContent = r.data.length + " " + (r.data.length === 1 ? "item" : "items");
      if (!r.data.length) { list.innerHTML = '<div class="note">Nothing here right now.</div>'; return; }
      list.innerHTML = r.data.map(card).join("");
    });
  }

  function dataRows(d) {
    if (!d || typeof d !== "object") return "";
    var keys = Object.keys(d);
    if (!keys.length) return "";
    return '<details style="margin:.6rem 0"><summary class="muted">Full submission as received</summary>' +
      '<dl class="kv" style="grid-template-columns:auto 1fr;margin-top:.6rem">' +
      keys.map(function (k) { return "<dt>" + esc(k) + "</dt><dd>" + esc(d[k]) + "</dd>"; }).join("") +
      "</dl></details>";
  }

  function card(s) {
    var isStory = s.type === "story";
    var ev = s.evidence_status || "unverified";
    var when = (s.created_at || "").replace("T", " ").slice(0, 16);
    return '<article class="card" data-id="' + esc(s.id) + '" style="margin-bottom:1rem">' +
      '<div style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;align-items:center">' +
        '<div><span class="pill">' + esc(TYPE_LABEL[s.type] || s.type) + '</span> ' +
          '<span class="tag tag--' + (s.status === "approved" ? "confirmed" : s.status === "rejected" ? "living" : "unverified") + '">' + esc(s.status) + '</span></div>' +
        '<div class="muted" style="font-size:.82rem">' + esc(when) + '</div>' +
      '</div>' +
      '<div class="field" style="margin-top:.8rem"><label>Title</label><input data-f="title" value="' + esc(s.title) + '"></div>' +
      '<div class="field"><label>About</label><input data-f="about" value="' + esc(s.about) + '"></div>' +
      '<div class="field"><label>Body</label><textarea data-f="body">' + esc(s.body) + '</textarea></div>' +
      (isStory ? '<div class="field"><label>Evidence label (shown publicly for stories)</label><select data-f="evidence_status">' +
        EV.map(function (e) { return '<option value="' + e + '"' + (e === ev ? " selected" : "") + ">" + e + "</option>"; }).join("") +
        "</select></div>" : "") +
      dataRows(s.data) +
      '<div class="field"><label>Curator notes (private)</label><textarea data-f="curator_notes" placeholder="Your working notes — never shown publicly">' + esc(s.curator_notes) + "</textarea></div>" +
      '<p class="muted" style="font-size:.82rem;margin:.2rem 0 .8rem">Contributor: ' + esc(s.contributor_name || "—") +
        (s.contributor_email ? " &middot; <a href='mailto:" + esc(s.contributor_email) + "'>" + esc(s.contributor_email) + "</a>" : "") + "</p>" +
      '<div class="btn-row">' +
        '<button class="btn btn--forest btn--sm" data-act="approve">Save &amp; Approve</button>' +
        '<button class="btn btn--ghost btn--sm" data-act="save">Save edits</button>' +
        '<button class="btn btn--ghost btn--sm" data-act="reject">Reject</button>' +
        '<button class="btn btn--ghost btn--sm" data-act="delete" style="margin-left:auto">Delete</button>' +
      "</div>" +
      '<div class="card-status muted" style="font-size:.85rem;margin-top:.5rem" hidden></div>' +
    "</article>";
  }

  function gather(card) {
    var patch = {};
    Array.prototype.forEach.call(card.querySelectorAll("[data-f]"), function (el) { patch[el.dataset.f] = el.value; });
    return patch;
  }
  function cardMsg(card, msg) { var s = card.querySelector(".card-status"); s.textContent = msg; s.hidden = false; }

  // ---- actions ------------------------------------------------------
  $("subs").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-act]");
    if (!btn) return;
    var card = btn.closest("[data-id]");
    var id = card.getAttribute("data-id");
    var act = btn.dataset.act;

    if (act === "delete") {
      if (btn.dataset.armed !== "1") { btn.dataset.armed = "1"; btn.textContent = "Click again to delete"; return; }
      client.from("submissions").delete().eq("id", id).then(function (r) {
        if (r.error) cardMsg(card, "Delete failed: " + r.error.message); else load();
      });
      return;
    }

    var patch = gather(card);
    if (act === "approve") { patch.status = "approved"; patch.reviewed_by = currentUid; }
    if (act === "reject")  { patch.status = "rejected"; patch.reviewed_by = currentUid; }
    cardMsg(card, "Saving…");
    client.from("submissions").update(patch).eq("id", id).then(function (r) {
      if (r.error) { cardMsg(card, "Error: " + r.error.message); return; }
      if (act === "save") cardMsg(card, "Saved.");
      else load(); // approve/reject: refresh so it leaves the current filter
    });
  });
})();
