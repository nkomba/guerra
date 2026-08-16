/* ==========================================================================
   tree-d3.js — interactive, collapsible family tree (D3 v7)
   --------------------------------------------------------------------------
   • Reads data/family.js and draws a hierarchical descendant tree from the
     earliest known ancestor.
   • Click a person to expand / collapse their descendants AND see details
     (spouse, children, birth/death, branch, migration, sources).
   • Colour + flag show the migration branch:
        🇵🇹 Portugal (stayed)   🇺🇸 United States   🇧🇷 Brazil
   • The RING colour shows how well the person is documented
     (confirmed / likely / unverified / family tradition).
   • Drag to pan, pinch/scroll to zoom; works on touch (tap = expand).
   D3 is loaded from a CDN in family-tree.html. This script waits for it.
   ========================================================================== */
(function () {
  "use strict";

  var MIG = {
    portugal: { color: "#2f5d50", flag: "🇵🇹", label: "Stayed in Portugal" },
    us:       { color: "#2f6f8f", flag: "🇺🇸", label: "United States" },
    brazil:   { color: "#b07d17", flag: "🇧🇷", label: "Brazil" }
  };
  var EV = {
    confirmed:  { color: "#2f7d4f", label: "Confirmed" },
    likely:     { color: "#2f6f8f", label: "Likely" },
    unverified: { color: "#b07d17", label: "Unverified" },
    tradition:  { color: "#7a5aa6", label: "Family tradition" }
  };
  function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}

  // ---- wait for D3 + data, then draw -------------------------------
  function boot() {
    var host = document.getElementById("tree-d3");
    if (!host) return;
    var tries = 0;
    (function wait() {
      if (typeof window.d3 !== "undefined" && window.GUERRA_DATA) { start(host); return; }
      if (tries++ > 120) { host.innerHTML = '<p class="muted" style="padding:1rem">The tree needs an internet connection to load (D3 library).</p>'; return; }
      setTimeout(wait, 50);
    })();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();

  // ---- main ---------------------------------------------------------
  function start(host) {
    var d3 = window.d3, DATA = window.GUERRA_DATA;
    var byId = {}; DATA.people.forEach(function (p) { byId[p.id] = p; });
    var branchById = {}; (DATA.branches || []).forEach(function (b) { branchById[b.id] = b; });
    function mig(p) { return MIG[p.migration] ? p.migration : "portugal"; }
    function nameOf(p) { return p.living ? "Living relative" : p.name; }

    // FOREST: the tree can show several unconnected family lines. Any person
    // flagged `treeRoot: true` starts a line (e.g. the sample Freixo line AND
    // the documented Ludlow, MA line). We build them under one hidden synthetic
    // root so a single layout positions every line, then we don't render that
    // synthetic node — the lines appear side-by-side but unconnected.
    var roots = DATA.people.filter(function (p) { return p.treeRoot; });
    if (!roots.length) { var fb = byId["p1"] || DATA.people[0]; if (fb) roots = [fb]; }
    var rootPerson = roots[0];
    var SYN = { __syn: true, id: "__syn", children: roots.map(function (r) { return r.id; }) };
    var root = d3.hierarchy(SYN, function (d) {
      var kids = d.__syn ? d.children : d.children;
      return (kids || []).map(function (id) { return byId[id]; }).filter(Boolean);
    });
    // Collapse each line beyond its first two generations initially (the hidden
    // synthetic root sits at depth 0, so real roots are depth 1).
    root.descendants().forEach(function (d) {
      if (d.depth >= 3 && d.children) { d._children = d.children; d.children = null; }
    });

    var LEVEL_W = 210, NODE_H = 74;
    host.innerHTML = "";
    var svg = d3.select(host).append("svg").attr("width", "100%").attr("height", 560);
    var g = svg.append("g");
    var layout = d3.tree().nodeSize([NODE_H, LEVEL_W]);
    var zoom = d3.zoom().scaleExtent([0.3, 2]).on("zoom", function (e) { g.attr("transform", e.transform); });
    svg.call(zoom);

    function sizeSvg() { svg.attr("width", host.clientWidth || 800).attr("height", 560); }
    sizeSvg(); window.addEventListener("resize", sizeSvg);
    function resetView() { svg.transition().duration(400).call(zoom.transform, d3.zoomIdentity.translate(70, 280).scale(0.85)); }

    // ---- detail panel ----
    var panel = document.getElementById("tree-detail");
    function relNames(ids) {
      if (!ids || !ids.length) return "—";
      return ids.map(function (id) { var r = byId[id]; return r ? esc(nameOf(r)) : esc(id); }).join(", ");
    }
    function showDetail(p) {
      if (!panel) return;
      var m = MIG[mig(p)], ev = EV[p.status] || EV.unverified, b = branchById[p.branch];
      if (p.living) {
        panel.innerHTML = '<div class="note"><strong>This relative may be living.</strong> Their details are hidden to protect privacy.</div>' +
          '<dl class="kv"><dt>Parents</dt><dd>' + relNames(p.parents) + '</dd><dt>Migration</dt><dd>' + m.flag + ' ' + esc(m.label) + '</dd></dl>';
        return;
      }
      panel.innerHTML =
        '<h3 style="margin:0 0 .3rem">' + esc(p.name) + '</h3>' +
        '<p style="margin:0 0 .6rem">' +
          '<span class="tag" style="background:' + m.color + '22;color:' + m.color + '">' + m.flag + ' ' + esc(m.label) + '</span> ' +
          '<span class="tag tag--' + (p.status || "unverified") + '">' + esc(ev.label) + '</span></p>' +
        '<dl class="kv">' +
          '<dt>Born</dt><dd>' + esc((p.birth && p.birth.date) || "unknown") + ((p.birth && p.birth.place) ? " · " + esc(p.birth.place) : "") + '</dd>' +
          '<dt>Died</dt><dd>' + esc((p.death && p.death.date) || "unknown") + ((p.death && p.death.place) ? " · " + esc(p.death.place) : "") + '</dd>' +
          '<dt>Parents</dt><dd>' + relNames(p.parents) + '</dd>' +
          '<dt>Spouse(s)</dt><dd>' + relNames(p.spouses) + '</dd>' +
          '<dt>Children</dt><dd>' + relNames(p.children) + '</dd>' +
          (b ? '<dt>Branch</dt><dd>' + esc(b.name) + '</dd>' : '') +
        '</dl>' +
        (p.notes ? '<p style="font-size:.92rem">' + esc(p.notes) + '</p>' : '') +
        '<p class="muted" style="font-size:.85rem;margin:.4rem 0 0">' +
          (p.sources && p.sources.length ? 'Sources: ' + esc(p.sources.join("; ")) : 'No sources recorded yet.') + '</p>';
    }

    // ---- render (clear & redraw — simple and robust) ----
    var activeId = null;
    function render() {
      layout(root);
      // Drop the hidden synthetic root and the links that emanate from it, so
      // each real family line renders as its own unconnected tree.
      var nodes = root.descendants().filter(function (d) { return !d.data.__syn; });
      var links = root.links().filter(function (l) { return !l.source.data.__syn; });
      g.selectAll("*").remove();

      g.selectAll("path.tree-link").data(links).enter().append("path")
        .attr("class", "tree-link").attr("fill", "none").attr("stroke", "#cbc3b2").attr("stroke-width", 1.6)
        .attr("d", function (d) {
          return "M" + d.source.y + "," + d.source.x +
                 "C" + (d.source.y + LEVEL_W / 2) + "," + d.source.x +
                 " " + (d.source.y + LEVEL_W / 2) + "," + d.target.x +
                 " " + d.target.y + "," + d.target.x;
        });

      var node = g.selectAll("g.tree-node").data(nodes).enter().append("g")
        .attr("class", function (d) { return "tree-node" + (d.data.id === activeId ? " is-active" : ""); })
        .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })
        .style("cursor", "pointer")
        .on("click", function (e, d) {
          if (d.children) { d._children = d.children; d.children = null; }
          else if (d._children) { d.children = d._children; d._children = null; }
          activeId = d.data.id; showDetail(d.data); render();
        });

      // outer ring marks collapsible (hidden children)
      node.append("circle").attr("r", 11).attr("fill", "none")
        .attr("stroke", function (d) { return d._children ? "#c1922f" : "none"; }).attr("stroke-width", 2.5);
      // main circle: fill = migration, ring stroke = evidence
      node.append("circle").attr("r", 7).attr("stroke-width", 3)
        .attr("fill", function (d) { return d.data.living ? "#b7ad99" : MIG[mig(d.data)].color; })
        .attr("stroke", function (d) { return (EV[d.data.status] || EV.unverified).color; });
      node.append("text").attr("dy", "-0.95em").attr("text-anchor", "middle").style("font-size", "12px")
        .text(function (d) { return MIG[mig(d.data)].flag; });
      node.append("text").attr("dy", "0.32em").attr("x", 16).style("font-weight", "600").style("font-size", "13px").attr("fill", "#2b2620")
        .text(function (d) { return nameOf(d.data) + (d._children ? " ▸" : ""); });
      node.append("text").attr("dy", "1.65em").attr("x", 16).style("font-size", "11px").attr("fill", "#6b6459")
        .text(function (d) {
          var p = d.data; if (p.living) return "living";
          var bd = p.birth && p.birth.date ? p.birth.date : "?";
          var dd = p.death && p.death.date ? p.death.date : "";
          return dd ? bd + "–" + dd : "b. " + bd;
        });
    }

    // ---- controls ----
    function expandAll(d) { if (d._children) { d.children = d._children; d._children = null; } if (d.children) d.children.forEach(expandAll); }
    function collapseAll(d) { if (d.children) { d.children.forEach(collapseAll); d._children = d.children; d.children = null; } }
    var be = document.getElementById("tree-expand"), bc = document.getElementById("tree-collapse"), br = document.getElementById("tree-reset");
    if (be) be.addEventListener("click", function () { expandAll(root); render(); });
    if (bc) bc.addEventListener("click", function () { if (root.children) root.children.forEach(collapseAll); render(); });
    if (br) br.addEventListener("click", resetView);

    render();
    resetView();
    showDetail(rootPerson);
  }
})();
