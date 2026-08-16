/* ==========================================================================
   main.js — shared chrome for every page
   --------------------------------------------------------------------------
   Injects the header (logo + navigation) and footer into each page so you
   only maintain them in ONE place. To add/rename/reorder a nav item, edit the
   NAV array below and every page updates automatically.

   This file uses NO fetch()/network calls, so the site works when you simply
   double-click index.html and open it from your hard drive (file://).
   Each page sets <body data-page="home"> etc. so the current link highlights.
   ========================================================================== */
(function () {
  "use strict";

  // ---- Edit your navigation here --------------------------------------
  var NAV = [
    { id: "home",     label: "Home",             href: "index.html" },
    { id: "about",    label: "About the Family", href: "about.html" },
    { id: "freixo",   label: "Freixo da Serra",  href: "freixo-da-serra.html" },
    { id: "tree",     label: "Family Tree",      href: "family-tree.html" },
    { id: "branches", label: "Branches",         href: "branches.html" },
    { id: "stories",  label: "Stories",          href: "stories.html" },
    { id: "explore",  label: "Explore & Play",   href: "explore.html" },
    { id: "sources",  label: "Sources & Method", href: "sources.html" },
    { id: "privacy",  label: "Privacy",          href: "privacy.html" },
    { id: "contact",  label: "Contact",          href: "contact.html" }
  ];

  // A small inline SVG crest used as the logo mark (no image file needed).
  var CREST =
    '<svg class="brand__mark" viewBox="0 0 48 48" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M24 3 6 10v12c0 11 8 18 18 23 10-5 18-12 18-23V10L24 3z" fill="#2f5d50" stroke="#22453b" stroke-width="1.5"/>' +
    '<path d="M24 12c-4 4-7 4-7 9 0 4 3 7 7 11 4-4 7-7 7-11 0-5-3-5-7-9z" fill="#c1922f"/>' +
    '<circle cx="24" cy="20" r="2.4" fill="#fffdf8"/></svg>';

  var page = document.body.getAttribute("data-page") || "";

  // ---- Build header ---------------------------------------------------
  var links = NAV.map(function (n) {
    var current = n.id === page ? ' aria-current="page"' : "";
    return '<li><a href="' + n.href + '"' + current + '>' + n.label + "</a></li>";
  }).join("");

  var headerHTML =
    '<header class="site-header"><div class="wrap"><nav class="nav" aria-label="Main navigation">' +
      '<a class="brand" href="index.html">' + CREST +
        '<span class="brand__text"><span class="brand__name">Guerra Family</span>' +
        '<span class="brand__sub">Freixo da Serra &middot; Portugal</span></span>' +
      "</a>" +
      '<button class="nav__toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
      "</button>" +
      '<ul class="nav__links" id="nav-links">' + links +
        '<li class="nav__cta"><a class="btn btn--primary btn--sm" href="contribute.html">Share what you know</a></li>' +
      "</ul>" +
    "</nav></div></header>";

  // ---- Build footer ---------------------------------------------------
  var year = new Date().getFullYear();
  var footerHTML =
    '<footer class="site-footer"><div class="wrap"><div class="footer-grid">' +
      "<div>" + CREST.replace('class="brand__mark"', 'width="40" height="40"') +
        '<h4 style="margin-top:.6rem">The Guerra Family of Freixo da Serra</h4>' +
        '<p style="opacity:.9;max-width:34ch">A community family-history project. Built and maintained by relatives, for relatives &mdash; documented carefully, shared respectfully.</p>' +
      "</div>" +
      '<div><h4>Explore</h4><ul class="footer-links">' +
        '<li><a href="family-tree.html">Family Tree</a></li>' +
        '<li><a href="branches.html">Family Branches</a></li>' +
        '<li><a href="stories.html">Stories &amp; Memories</a></li>' +
        '<li><a href="freixo-da-serra.html">Freixo da Serra</a></li>' +
      "</ul></div>" +
      '<div><h4>Take part</h4><ul class="footer-links">' +
        '<li><a href="contribute.html">Contribute</a></li>' +
        '<li><a href="sources.html">Sources &amp; Method</a></li>' +
        '<li><a href="privacy.html">Privacy &amp; Ethics</a></li>' +
        '<li><a href="contact.html">Contact the Curator</a></li>' +
      "</ul></div>" +
    "</div>" +
    '<div class="footer-bottom"><p style="margin:0">&copy; ' + year + ' The Guerra Family Project. Stories and photographs remain the property of the families who share them. ' +
    'Please see our <a href="privacy.html">privacy &amp; ethics policy</a>. This site does not reproduce paywalled or copyrighted records from commercial genealogy platforms.</p></div>' +
    "</div></footer>";

  // ---- Mount ----------------------------------------------------------
  var headerMount = document.getElementById("site-header");
  var footerMount = document.getElementById("site-footer");
  if (headerMount) headerMount.outerHTML = headerHTML;
  if (footerMount) footerMount.outerHTML = footerHTML;

  // ---- Mobile menu toggle --------------------------------------------
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-links");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { menu.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }
})();
