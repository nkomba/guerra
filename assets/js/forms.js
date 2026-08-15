/* ==========================================================================
   forms.js — contribution forms: submit ONLINE (Supabase) + email/download
   --------------------------------------------------------------------------
   Two modes, chosen automatically:

   • BACKEND CONFIGURED (assets/js/supabase-config.js filled in):
       Each form shows a primary "Submit online to the curator" button that
       saves the contribution straight into the database as a PENDING item for
       the curator to review in admin.html. Email and download remain as
       friendly fallbacks.

   • OFFLINE (backend not configured yet):
       The online button is not shown; forms behave exactly as before —
       "Open email to send" and "Download as a file".

   ▸ Curator email (used for the fallbacks and "email the curator" links):
   ========================================================================== */
(function () {
  "use strict";

  var CURATOR_EMAIL = "curator@guerraclan.org"; // ← change to your real address

  var DB = window.GuerraDB || { ready: false };

  // ---- tabbed form switcher (Contribute page) ------------------------
  var tablist = document.querySelector(".form-tabs");
  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll(".form-tab"));
    var panels = Array.prototype.slice.call(document.querySelectorAll(".form-panel"));
    function activate(id) {
      tabs.forEach(function (t) { t.setAttribute("aria-selected", t.dataset.target === id ? "true" : "false"); });
      panels.forEach(function (p) { p.classList.toggle("is-active", p.id === id); });
    }
    tablist.addEventListener("click", function (e) {
      var t = e.target.closest(".form-tab");
      if (t) { activate(t.dataset.target); document.getElementById(t.dataset.target).scrollIntoView({ block: "nearest" }); }
    });
    if (location.hash) { var el = document.querySelector(location.hash + ".form-panel"); if (el) activate(el.id); }
  }

  // ---- collect a form's answers --------------------------------------
  function collect(form) {
    var type = form.getAttribute("data-type") || "Contribution";
    var lines = [];        // human-readable, for email/download
    var fields = {};       // name → value, for the database
    var missing = [];
    Array.prototype.forEach.call(form.querySelectorAll("[name]"), function (f) {
      var labelEl = form.querySelector('label[for="' + f.id + '"]');
      var label = labelEl ? labelEl.textContent.replace(/\*/g, "").trim() : f.name;
      var val = (f.value || "").trim();
      if (f.hasAttribute("required") && !val) missing.push({ el: f, label: label });
      if (val) { lines.push(label + ":\n  " + val.replace(/\n/g, "\n  ")); fields[f.name] = val; }
    });
    return { type: type, lines: lines, fields: fields, missing: missing };
  }

  function status(form, msg, ok) {
    var s = form.querySelector(".form-status");
    if (!s) return;
    s.innerHTML = msg;
    s.classList.add("is-visible");
    s.classList.toggle("form-status--ok", ok !== false);
    s.setAttribute("role", "status");
  }

  function flagMissing(form, res) {
    Array.prototype.forEach.call(form.querySelectorAll(".field--error"), function (el) { el.classList.remove("field--error"); });
    res.missing.forEach(function (m) { var fld = m.el.closest(".field"); if (fld) fld.classList.add("field--error"); });
    res.missing[0].el.focus();
    status(form, "Please fill in the required fields marked with * (" +
      res.missing.map(function (m) { return m.label; }).join(", ") + ").", false);
  }

  // ---- email / download bodies ---------------------------------------
  function fmtBody(res) {
    return "GUERRA FAMILY PROJECT — " + res.type.toUpperCase() + "\n" +
      "Submitted: " + new Date().toLocaleString() + "\n" +
      "----------------------------------------\n\n" +
      res.lines.join("\n\n") +
      "\n\n----------------------------------------\n" +
      "The curator may edit submissions for clarity, privacy, and documentation quality before publishing.";
  }
  function doEmail(form, res) {
    window.location.href = "mailto:" + encodeURIComponent(CURATOR_EMAIL) +
      "?subject=" + encodeURIComponent("Guerra Family — " + res.type) +
      "&body=" + encodeURIComponent(fmtBody(res));
    status(form, "<strong>Your email app should be opening.</strong> If nothing happens, use " +
      "“Download as a file” and email it to <a href='mailto:" + CURATOR_EMAIL + "'>" + CURATOR_EMAIL + "</a>. Thank you!");
  }
  function doDownload(form, res) {
    var name = "guerra-" + res.type.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + new Date().toISOString().slice(0, 10) + ".txt";
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([fmtBody(res)], { type: "text/plain" }));
    a.download = name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    status(form, "<strong>Saved as “" + name + "”.</strong> Please email it to " +
      "<a href='mailto:" + CURATOR_EMAIL + "'>" + CURATOR_EMAIL + "</a> (attach any photos to the same email). Thank you!");
  }

  // ---- map a form to a database row ----------------------------------
  function toRow(form, res) {
    var f = res.fields;
    var t = form.getAttribute("data-dbtype") || "story";
    var row = {
      type: t,
      data: f,                                   // full raw submission
      contributor_name: f.contributor || null,
      contributor_email: f.email || null,
      evidence_status: "unverified"
    };
    if (t === "story")           { row.title = f.title || "Untitled story"; row.about = f.about || null; row.body = f.story || ""; }
    else if (t === "photo")      { row.title = f.item || "Photo / document"; row.about = f.depicts || null; row.body = [f.item, f.date ? "(" + f.date + ")" : "", f.owner ? "Held by: " + f.owner : ""].filter(Boolean).join(" "); }
    else if (t === "correction") { row.title = f.location || "Correction"; row.about = f.current || null; row.body = (f.correction || "") + (f.evidence ? "\n\nEvidence: " + f.evidence : ""); }
    else if (t === "new_person") { row.title = f.full_name || "New relative"; row.body = [f.birth_date && ("Born " + f.birth_date + (f.birth_place ? ", " + f.birth_place : "")), f.death_date && ("Died " + f.death_date + (f.death_place ? ", " + f.death_place : "")), f.parents && ("Parents: " + f.parents), f.spouses && ("Spouse(s): " + f.spouses), f.children && ("Children: " + f.children), f.living && ("Living: " + f.living), f.sources && ("Sources: " + f.sources)].filter(Boolean).join("\n"); }
    else if (t === "lead")       { row.title = (f.lead || "Research lead").slice(0, 80); row.about = f.source || null; row.body = (f.lead || "") + (f.next_step ? "\n\nSuggested next step: " + f.next_step : ""); }
    return row;
  }

  function doOnline(form, btn) {
    var res = collect(form);
    if (res.missing.length) { flagMissing(form, res); return; }
    btn.disabled = true;
    var original = btn.textContent;
    btn.textContent = "Sending…";
    DB.submit(toRow(form, res)).then(function (r) {
      btn.disabled = false; btn.textContent = original;
      if (r && r.error) {
        status(form, "<strong>Sorry — that didn't send.</strong> (" + (r.error.message || "unknown error") +
          ") Please try “Download as a file” and email it to <a href='mailto:" + CURATOR_EMAIL + "'>" + CURATOR_EMAIL + "</a>.", false);
        return;
      }
      form.reset();
      status(form, "<strong>Thank you — your contribution was received.</strong> " +
        "It's now waiting for the family curator to review it. Nothing is published until it's approved.");
    })["catch"](function (err) {
      btn.disabled = false; btn.textContent = original;
      status(form, "<strong>Sorry — that didn't send.</strong> (" + (err && err.message || "network error") +
        ") Please try “Download as a file” instead.", false);
    });
  }

  // ---- wire every contribution form ----------------------------------
  Array.prototype.forEach.call(document.querySelectorAll(".contrib-form"), function (form) {
    form.addEventListener("submit", function (e) { e.preventDefault(); });

    // When the backend is live, add a primary "Submit online" button and
    // gently demote email/download to secondary fallbacks.
    if (DB.ready) {
      var row = form.querySelector(".btn-row");
      if (row) {
        var online = document.createElement("button");
        online.type = "button";
        online.className = "btn btn--primary";
        online.setAttribute("data-action", "online");
        online.textContent = "Submit online to the curator";
        row.insertBefore(online, row.firstChild);
        // make the old email/download buttons visually secondary
        Array.prototype.forEach.call(row.querySelectorAll('[data-action="email"]'), function (b) {
          b.classList.remove("btn--primary"); b.classList.add("btn--ghost");
        });
        var hint = document.createElement("p");
        hint.className = "hint";
        hint.style.marginTop = ".4rem";
        hint.innerHTML = "Prefer not to submit online? You can still open an email or download a file below.";
        row.parentNode.insertBefore(hint, row.nextSibling);
      }
    }

    form.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-action]");
      if (!btn) return;
      var action = btn.dataset.action;
      if (action === "online") { doOnline(form, btn); return; }
      var res = collect(form);
      if (res.missing.length) { flagMissing(form, res); return; }
      if (action === "email") doEmail(form, res);
      else if (action === "download") doDownload(form, res);
    });
  });

  // Reflect the curator email anywhere it's referenced on the page
  Array.prototype.forEach.call(document.querySelectorAll("[data-curator-email]"), function (el) {
    el.textContent = CURATOR_EMAIL;
    if (el.tagName === "A") el.href = "mailto:" + CURATOR_EMAIL;
  });
})();
