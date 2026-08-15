/* ==========================================================================
   forms.js — makes the contribution forms work on a static site
   --------------------------------------------------------------------------
   There is no server behind this site, so a form cannot "save" to a database.
   Instead every form offers two friendly, no-account ways to send a
   contribution to the family curator:

     1. "Open email to send"  → opens the visitor's email app with everything
        pre-filled and addressed to the curator. They just press Send.
     2. "Download as a file"  → saves a neat text file the visitor can attach
        to an email, print, or hand over however they like.

   ▸ SET THE CURATOR EMAIL ADDRESS HERE:
   ========================================================================== */
(function () {
  "use strict";

  var CURATOR_EMAIL = "curator@guerraclan.org"; // ← change to your real address

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
    // Allow deep-linking, e.g. contribute.html#panel-photo
    if (location.hash) { var el = document.querySelector(location.hash + ".form-panel"); if (el) activate(el.id); }
  }

  // ---- collect a form's answers into readable text -------------------
  function collect(form) {
    var type = form.getAttribute("data-type") || "Contribution";
    var lines = [];
    var missing = [];
    var fields = form.querySelectorAll("[name]");
    Array.prototype.forEach.call(fields, function (f) {
      var labelEl = form.querySelector('label[for="' + f.id + '"]');
      var label = labelEl ? labelEl.textContent.replace(/\*/g, "").trim() : f.name;
      var val = (f.value || "").trim();
      if (f.hasAttribute("required") && !val) { missing.push({ el: f, label: label }); }
      if (val) lines.push(label + ":\n  " + val.replace(/\n/g, "\n  "));
    });
    return { type: type, lines: lines, missing: missing };
  }

  function showStatus(form, msg) {
    var s = form.querySelector(".form-status");
    if (!s) return;
    s.innerHTML = msg;
    s.classList.add("is-visible", "form-status--ok");
    s.setAttribute("role", "status");
  }

  function fmtBody(res) {
    return (
      "GUERRA FAMILY PROJECT — " + res.type.toUpperCase() + "\n" +
      "Submitted: " + new Date().toLocaleString() + "\n" +
      "----------------------------------------\n\n" +
      res.lines.join("\n\n") +
      "\n\n----------------------------------------\n" +
      "Sent from the Contribute page. The curator may edit submissions for " +
      "clarity, privacy, and documentation quality before publishing."
    );
  }

  function doEmail(form, res) {
    var subject = "Guerra Family — " + res.type;
    var url = "mailto:" + encodeURIComponent(CURATOR_EMAIL) +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(fmtBody(res));
    window.location.href = url;
    showStatus(form,
      "<strong>Your email app should be opening.</strong> If nothing happens, use " +
      "“Download as a file” instead and email it to <a href='mailto:" + CURATOR_EMAIL + "'>" +
      CURATOR_EMAIL + "</a>. Thank you for contributing!");
  }

  function doDownload(form, res) {
    var text = fmtBody(res);
    var stamp = new Date().toISOString().slice(0, 10);
    var name = "guerra-" + res.type.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + stamp + ".txt";
    var blob = new Blob([text], { type: "text/plain" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    showStatus(form,
      "<strong>Saved as “" + name + "”.</strong> Please email it to " +
      "<a href='mailto:" + CURATOR_EMAIL + "'>" + CURATOR_EMAIL + "</a> " +
      "(you can attach photos or documents to the same email). Thank you!");
  }

  // ---- wire every contribution form ----------------------------------
  Array.prototype.forEach.call(document.querySelectorAll(".contrib-form"), function (form) {
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    form.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-action]");
      if (!btn) return;
      var res = collect(form);
      // clear old error styling
      Array.prototype.forEach.call(form.querySelectorAll(".field--error"), function (el) {
        el.classList.remove("field--error");
      });
      if (res.missing.length) {
        res.missing.forEach(function (m) {
          var field = m.el.closest(".field"); if (field) field.classList.add("field--error");
        });
        res.missing[0].el.focus();
        showStatus(form, "Please fill in the required fields marked with * (" +
          res.missing.map(function (m) { return m.label; }).join(", ") + ").");
        form.querySelector(".form-status").classList.remove("form-status--ok");
        return;
      }
      if (btn.dataset.action === "email") doEmail(form, res);
      else doDownload(form, res);
    });
  });

  // Reflect the curator email anywhere it's referenced on the page
  Array.prototype.forEach.call(document.querySelectorAll("[data-curator-email]"), function (el) {
    el.textContent = CURATOR_EMAIL;
    if (el.tagName === "A") el.href = "mailto:" + CURATOR_EMAIL;
  });
})();
