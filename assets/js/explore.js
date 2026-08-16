/* ==========================================================================
   explore.js — the three family-friendly interactive activities
   --------------------------------------------------------------------------
   1. "Find the Village" — a zoomable Leaflet map (Portugal → Guarda →
      Gouveia → Freixo da Serra) with quick-zoom buttons.
   2. "Match the Ancestor" — pair each ancestor with a clue.
   3. "Family Trivia" — a short multiple-choice quiz.
   All three are plain, dependency-light (only Leaflet, loaded via CDN) and
   read the family data from data/family.js where useful. Each guards on its
   container so nothing runs on pages that don't include it.
   ========================================================================== */
(function () {
  "use strict";
  function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}

  /* ---- 1. FIND THE VILLAGE (Leaflet map) ---------------------------- */
  (function initMap() {
    var el = document.getElementById("village-map");
    if (!el || typeof L === "undefined") { if (el) el.innerHTML = '<p class="muted" style="padding:1rem">Map could not load (needs an internet connection).</p>'; return; }

    // Approximate location of Freixo da Serra, Gouveia, Guarda, Portugal.
    var FREIXO = [40.472, -7.553];
    var LEVELS = {
      portugal: { center: [39.6, -8.0], zoom: 6,  label: "Portugal" },
      guarda:   { center: [40.55, -7.35], zoom: 9, label: "Guarda district" },
      gouveia:  { center: [40.50, -7.59], zoom: 11, label: "Gouveia" },
      freixo:   { center: FREIXO, zoom: 14, label: "Freixo da Serra" }
    };

    var map = L.map(el, { scrollWheelZoom: false }).setView(LEVELS.portugal.center, LEVELS.portugal.zoom);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18, attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    map.touchZoom.enable(); map.doubleClickZoom.enable();

    var marker = L.marker(FREIXO).addTo(map)
      .bindPopup("<strong>Freixo da Serra</strong><br>Gouveia · Guarda · Portugal<br>Home of the Guerra family");

    // quick-zoom buttons
    var bar = document.getElementById("map-levels");
    if (bar) {
      Object.keys(LEVELS).forEach(function (k) {
        var b = document.createElement("button");
        b.className = "btn btn--ghost btn--sm"; b.type = "button";
        b.textContent = LEVELS[k].label;
        b.addEventListener("click", function () {
          map.flyTo(LEVELS[k].center, LEVELS[k].zoom, { duration: 1.1 });
          if (k === "freixo") setTimeout(function(){ marker.openPopup(); }, 1100);
        });
        bar.appendChild(b);
      });
    }
    // enable scroll-zoom only after a click (so the page still scrolls past it)
    map.on("click", function () { map.scrollWheelZoom.enable(); });
  })();

  /* ---- 2. MATCH THE ANCESTOR --------------------------------------- */
  (function initMatch() {
    var host = document.getElementById("match-game");
    if (!host) return;
    var data = window.GUERRA_DATA;
    if (!data) { host.innerHTML = '<p class="muted">Family data not available.</p>'; return; }
    var byId = {}; data.people.forEach(function (p) { byId[p.id] = p; });

    // Use five well-documented ancestors; clue = birth year + place.
    var ids = ["p1", "p3", "p5", "p6", "p12"].filter(function (id) { return byId[id]; });
    var pairs = ids.map(function (id) {
      var p = byId[id];
      return { id: id, name: p.name, clue: "Born " + (p.birth && p.birth.date || "?") + (p.birth && p.birth.place ? " · " + p.birth.place.split(",")[0] : "") };
    });

    function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }
    var selName = null, solved = 0;

    function render() {
      var names = shuffle(pairs), clues = shuffle(pairs);
      host.innerHTML =
        '<div class="match-cols">' +
          '<div class="match-col" data-col="name">' + names.map(function (p) {
            return '<button class="match-item" data-id="' + p.id + '" data-kind="name">' + esc(p.name) + '</button>'; }).join("") + '</div>' +
          '<div class="match-col" data-col="clue">' + clues.map(function (p) {
            return '<button class="match-item" data-id="' + p.id + '" data-kind="clue">' + esc(p.clue) + '</button>'; }).join("") + '</div>' +
        '</div>' +
        '<p class="match-status muted" id="match-status">Tap a name, then tap the clue that matches it.</p>';
      solved = 0; selName = null;
    }

    host.addEventListener("click", function (e) {
      var btn = e.target.closest(".match-item"); if (!btn || btn.classList.contains("is-solved")) return;
      var status = document.getElementById("match-status");
      if (btn.dataset.kind === "name") {
        Array.prototype.forEach.call(host.querySelectorAll('.match-item[data-kind="name"]'), function (b) { b.classList.remove("is-sel"); });
        btn.classList.add("is-sel"); selName = btn;
        return;
      }
      // clicked a clue
      if (!selName) { status.textContent = "First tap a name on the left."; return; }
      if (selName.dataset.id === btn.dataset.id) {
        selName.classList.add("is-solved"); btn.classList.add("is-solved");
        selName.classList.remove("is-sel"); selName = null; solved++;
        if (solved === pairs.length) { status.innerHTML = "🎉 <strong>You matched them all!</strong> Well done."; }
        else { status.textContent = solved + " of " + pairs.length + " matched — keep going!"; }
      } else {
        btn.classList.add("is-wrong");
        setTimeout(function(){ btn.classList.remove("is-wrong"); }, 500);
        status.textContent = "Not a match — try again.";
      }
    });

    var reset = document.getElementById("match-reset");
    if (reset) reset.addEventListener("click", render);
    render();
  })();

  /* ---- 3. FAMILY TRIVIA -------------------------------------------- */
  (function initTrivia() {
    var host = document.getElementById("trivia");
    if (!host) return;
    var Q = [
      { q: "In which mountain range does Freixo da Serra sit?", a: 1,
        opts: ["The Pyrenees", "The Serra da Estrela", "The Alps", "The Picos de Europa"] },
      { q: "Which great river is born in the highlands near Freixo da Serra?", a: 2,
        opts: ["The Tagus (Tejo)", "The Douro", "The Mondego", "The Guadiana"] },
      { q: "Across the ocean, which country is the family's main emigration story?", a: 0,
        opts: ["The United States", "Canada", "Australia", "Argentina"] },
      { q: "The village is named after the “freixo” — which tree is that?", a: 3,
        opts: ["Oak", "Chestnut", "Olive", "Ash"] },
      { q: "Freixo da Serra belongs to which municipality?", a: 1,
        opts: ["Seia", "Gouveia", "Guarda", "Covilhã"] }
    ];
    var score = 0, answered = 0;
    host.innerHTML = Q.map(function (item, qi) {
      return '<div class="trivia-q" data-q="' + qi + '">' +
        '<p class="trivia-prompt"><strong>' + (qi + 1) + '.</strong> ' + esc(item.q) + '</p>' +
        '<div class="trivia-opts">' + item.opts.map(function (o, oi) {
          return '<button class="btn btn--ghost trivia-opt" data-q="' + qi + '" data-o="' + oi + '">' + esc(o) + '</button>';
        }).join("") + '</div></div>';
    }).join("") + '<p class="trivia-score muted" id="trivia-score">Answer the questions to see your score.</p>';

    host.addEventListener("click", function (e) {
      var btn = e.target.closest(".trivia-opt"); if (!btn) return;
      var qi = +btn.dataset.q, oi = +btn.dataset.o;
      var wrap = host.querySelector('.trivia-q[data-q="' + qi + '"]');
      if (wrap.classList.contains("done")) return;
      wrap.classList.add("done");
      var correct = Q[qi].a;
      answered++;
      Array.prototype.forEach.call(wrap.querySelectorAll(".trivia-opt"), function (b) {
        var bi = +b.dataset.o; b.disabled = true;
        if (bi === correct) b.classList.add("is-correct");
        else if (bi === oi) b.classList.add("is-wrong");
      });
      if (oi === correct) score++;
      var s = document.getElementById("trivia-score");
      s.innerHTML = "Score: <strong>" + score + " / " + Q.length + "</strong>" +
        (answered === Q.length ? (score === Q.length ? " — 🎉 a true Guerra historian!" : " — nicely done! Try again to beat your score.") : "");
    });
  })();
})();
