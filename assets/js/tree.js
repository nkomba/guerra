/* ==========================================================================
   tree.js — renders the interactive family tree from data/family.js
   --------------------------------------------------------------------------
   You do not normally need to edit this file — add PEOPLE in data/family.js.
   This script:
     • groups people by generation
     • lets visitors search by name/place and filter by branch, generation,
       and evidence status
     • opens a person "profile card" with sources and links to relatives
     • automatically HIDES the details of anyone marked  "living": true
   No network calls — works when opened directly from disk (file://).
   ========================================================================== */
(function () {
  "use strict";

  var DATA = window.GUERRA_DATA;
  if (!DATA) { return; }

  var byId = {};
  DATA.people.forEach(function (p) { byId[p.id] = p; });
  var branchById = {};
  (DATA.branches || []).forEach(function (b) { branchById[b.id] = b; });

  var STATUS_LABEL = {
    confirmed: "Confirmed", likely: "Likely",
    unverified: "Unverified", tradition: "Family tradition"
  };

  // ---- helpers --------------------------------------------------------
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function displayName(p) { return p.living ? "Living relative (details hidden)" : p.name; }
  function lifespan(p) {
    if (p.living) return "Living";
    var b = p.birth && p.birth.date ? p.birth.date : "?";
    var d = p.death && p.death.date ? p.death.date : "";
    return d ? b + " – " + d : "b. " + b;
  }
  function statusTag(p) {
    if (p.living) return '<span class="tag tag--living">Living – protected</span>';
    var s = p.status || "unverified";
    return '<span class="tag tag--' + s + '">' + esc(STATUS_LABEL[s] || s) + "</span>";
  }

  // ---- render the grouped tree ---------------------------------------
  var treeEl = document.getElementById("tree");
  var countEl = document.getElementById("tree-count");

  function personCard(p) {
    var place = (p.birth && p.birth.place && !p.living) ? p.birth.place : "";
    var branch = branchById[p.branch] ? branchById[p.branch].name : "";
    return (
      '<button class="person" data-id="' + p.id + '" aria-haspopup="dialog">' +
        '<span class="person__name">' + esc(displayName(p)) + "</span>" +
        '<span class="person__dates">' + esc(lifespan(p)) + "</span>" +
        (place ? '<span class="person__place">📍 ' + esc(place) + "</span>" : "") +
        '<span class="person__tags">' + statusTag(p) +
          (branch ? ' <span class="pill">' + esc(branch.split(" (")[0]) + "</span>" : "") +
        "</span>" +
      "</button>"
    );
  }

  function render(list) {
    if (!treeEl) return;
    if (!list.length) {
      treeEl.innerHTML = '<div class="note">No people match these filters. Try clearing the search box or choosing “All”.</div>';
      if (countEl) countEl.textContent = "0 people";
      return;
    }
    var gens = {};
    list.forEach(function (p) { (gens[p.gen] = gens[p.gen] || []).push(p); });
    var html = Object.keys(gens).sort(function (a, b) { return a - b; }).map(function (g) {
      var people = gens[g].sort(function (a, b) { return a.name.localeCompare(b.name); });
      return (
        '<div class="gen-group"><h3 class="gen-label">Generation ' + g + " &middot; " + people.length + " " + (people.length === 1 ? "person" : "people") + "</h3>" +
        '<div class="person-grid">' + people.map(personCard).join("") + "</div></div>"
      );
    }).join("");
    treeEl.innerHTML = html;
    if (countEl) countEl.textContent = list.length + " of " + DATA.people.length + " people";
  }

  // ---- filtering ------------------------------------------------------
  var q = document.getElementById("tree-search");
  var fBranch = document.getElementById("filter-branch");
  var fGen = document.getElementById("filter-gen");
  var fStatus = document.getElementById("filter-status");

  function applyFilters() {
    var term = (q && q.value || "").trim().toLowerCase();
    var b = fBranch && fBranch.value || "";
    var g = fGen && fGen.value || "";
    var s = fStatus && fStatus.value || "";
    var out = DATA.people.filter(function (p) {
      if (b && p.branch !== b) return false;
      if (g && String(p.gen) !== g) return false;
      if (s && (p.living ? "living" : p.status) !== s) return false;
      if (term) {
        var hay = (p.living ? "living relative" : p.name) + " " +
          (!p.living && p.birth ? p.birth.place || "" : "") + " " +
          (!p.living && p.death ? p.death.place || "" : "");
        if (hay.toLowerCase().indexOf(term) === -1) return false;
      }
      return true;
    });
    render(out);
  }

  // populate filter dropdowns
  if (fBranch) {
    (DATA.branches || []).forEach(function (b) {
      var o = document.createElement("option");
      o.value = b.id; o.textContent = b.name.split(" (")[0];
      fBranch.appendChild(o);
    });
  }
  if (fGen) {
    var gensSet = {};
    DATA.people.forEach(function (p) { gensSet[p.gen] = true; });
    Object.keys(gensSet).sort(function (a, b) { return a - b; }).forEach(function (g) {
      var o = document.createElement("option");
      o.value = g; o.textContent = "Generation " + g;
      fGen.appendChild(o);
    });
  }
  [q, fBranch, fGen, fStatus].forEach(function (el) {
    if (el) el.addEventListener("input", applyFilters);
  });

  // ---- person detail dialog ------------------------------------------
  var modal = document.getElementById("person-modal");

  function relNames(ids) {
    if (!ids || !ids.length) return '<span class="muted">—</span>';
    return ids.map(function (id) {
      var r = byId[id];
      if (!r) return esc(id);
      return '<button class="rel-link" data-id="' + id + '">' + esc(displayName(r)) + "</button>";
    }).join(", ");
  }

  function openPerson(id) {
    var p = byId[id];
    if (!p || !modal) return;
    var body = modal.querySelector(".modal__body");
    var head = modal.querySelector(".modal__head");

    head.innerHTML =
      '<button class="modal__close" aria-label="Close">&times;</button>' +
      "<h2>" + esc(displayName(p)) + "</h2>" +
      '<div class="person__dates">' + esc(lifespan(p)) + "</div>" +
      '<div style="margin-top:.6rem">' + statusTag(p) + "</div>";

    if (p.living) {
      body.innerHTML =
        '<div class="note"><strong>This relative may be living.</strong> To protect their privacy, ' +
        "personal details are not shown publicly. If this is you, or you have consent to share, " +
        'please <a href="contribute.html">contact the curator</a>.</div>' +
        '<dl class="kv"><dt>Parents</dt><dd>' + relNames(p.parents) + "</dd></dl>";
    } else {
      var b = branchById[p.branch];
      body.innerHTML =
        '<dl class="kv">' +
          "<dt>Born</dt><dd>" + esc((p.birth && p.birth.date) || "unknown") +
            ((p.birth && p.birth.place) ? " &middot; " + esc(p.birth.place) : "") + "</dd>" +
          "<dt>Died</dt><dd>" + esc((p.death && p.death.date) || "unknown") +
            ((p.death && p.death.place) ? " &middot; " + esc(p.death.place) : "") + "</dd>" +
          "<dt>Parents</dt><dd>" + relNames(p.parents) + "</dd>" +
          "<dt>Spouse(s)</dt><dd>" + relNames(p.spouses) + "</dd>" +
          "<dt>Children</dt><dd>" + relNames(p.children) + "</dd>" +
          (b ? "<dt>Branch</dt><dd>" + esc(b.name) + "</dd>" : "") +
        "</dl>" +
        (p.notes ? "<h3>Notes</h3><p>" + esc(p.notes) + "</p>" : "") +
        "<h3>Sources</h3>" +
          (p.sources && p.sources.length
            ? "<ul>" + p.sources.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>"
            : '<p class="muted">No sources recorded yet. <a href="contribute.html">Know one? Share it.</a></p>') +
        '<div class="btn-row" style="margin-top:1.2rem">' +
          '<a class="btn btn--ghost btn--sm" href="contribute.html">Suggest a correction</a>' +
          '<a class="btn btn--ghost btn--sm" href="contribute.html">Add a source or photo</a>' +
        "</div>";
    }

    if (typeof modal.showModal === "function") { modal.showModal(); }
    else { modal.setAttribute("open", ""); }
  }

  if (treeEl) {
    treeEl.addEventListener("click", function (e) {
      var btn = e.target.closest(".person");
      if (btn) openPerson(btn.getAttribute("data-id"));
    });
  }
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target.classList.contains("modal__close")) { modal.close(); return; }
      var rel = e.target.closest(".rel-link");
      if (rel) openPerson(rel.getAttribute("data-id"));
      // click on backdrop closes
      if (e.target === modal) modal.close();
    });
  }

  // ---- go -------------------------------------------------------------
  render(DATA.people);
})();
