/* ==========================================================================
   db.js — the data layer between the website and Supabase
   --------------------------------------------------------------------------
   Loaded (in this order) by any page that talks to the backend:
       <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
       <script src="assets/js/supabase-config.js"></script>
       <script src="assets/js/db.js"></script>

   Exposes window.GuerraDB:
       .ready                 true only when Supabase is configured & loaded
       .client                the raw Supabase client (used by admin.js/storage.js)
       .session()             → current session or null (never throws)
       .submit(row)           save a new PENDING contribution (anon allowed)
       .stories(limit)        approved stories (public_stories view)
       .people()              approved people, living ones masked (public_people)
       .relationships()       approved tree edges (public_relationships)
       .branches()            public family branches (public_family_branches)
       .photos(limit)         approved public photos (public_photos view)
       .publicPhotoUrl(path)  URL for an image in the public-photos bucket

   Design notes
     • No fetch()/network at load time — safe to open from disk (file://).
       When not configured, .ready is false and callers fall back gracefully.
     • Every reader RESOLVES (never rejects) to {data, error} so callers can
       handle empty results and policy/auth failures without try/catch soup.
   ========================================================================== */
(function () {
  "use strict";

  // Normalise the URL: accept a pasted ".../rest/v1/" and trailing slashes.
  function normaliseUrl(u) {
    return String(u || "")
      .trim()
      .replace(/\/+$/, "")            // drop trailing slashes
      .replace(/\/rest\/v1$/i, "")    // drop a stray /rest/v1
      .replace(/\/+$/, "");
  }

  var URL_RAW = window.SUPABASE_URL || "";
  var URL = normaliseUrl(URL_RAW);
  var KEY = (window.SUPABASE_ANON_KEY || "").trim();

  // "Configured" = real values, not the shipped placeholders.
  var configured =
    !!URL && !!KEY &&
    URL.indexOf("YOUR-PROJECT") === -1 &&
    KEY.indexOf("YOUR-") === -1 &&
    KEY.indexOf("PASTE") === -1 &&
    KEY.length > 20;

  var client = null;
  if (configured && window.supabase && typeof window.supabase.createClient === "function") {
    try {
      client = window.supabase.createClient(URL, KEY, {
        auth: { persistSession: true, autoRefreshToken: true }
      });
    } catch (e) {
      if (window.console) console.warn("[GuerraDB] client init failed:", e);
    }
  } else if (configured && window.console) {
    console.warn("[GuerraDB] Supabase library not loaded (check your internet connection / CDN).");
  }

  function ok(data) { return Promise.resolve({ data: data, error: null }); }
  function safe(promise) {
    // Turn any thrown/rejected error into a resolved {data:null,error}.
    return Promise.resolve(promise).then(
      function (r) { return r; },
      function (err) { return { data: null, error: err || { message: "Network error" } }; }
    );
  }

  window.GuerraDB = {
    ready: !!client,
    client: client,
    url: URL,

    session: function () {
      if (!client) return Promise.resolve(null);
      return client.auth.getSession().then(
        function (r) { return (r && r.data && r.data.session) || null; },
        function () { return null; }
      );
    },

    // Save a new contribution — always PENDING; stamps submitted_by if signed in.
    submit: function (row) {
      if (!client) return Promise.resolve({ error: { message: "Backend not configured" } });
      row = row || {};
      row.status = "pending";
      return this.session().then(function (session) {
        if (session && session.user) row.submitted_by = session.user.id;
        return safe(client.from("submissions").insert([row]));
      });
    },

    stories:       function (limit) { return readView("public_stories", limit); },
    people:        function ()      { return readView("public_people", null, "generation"); },
    relationships: function ()      { return readView("public_relationships", null, null); },
    branches:      function ()      { return readView("public_family_branches", null, null); },
    photos:        function (limit) { return readView("public_photos", limit); },

    // Build a public URL for an image stored in the public-photos bucket.
    publicPhotoUrl: function (path) {
      if (!client || !path) return "";
      try { return client.storage.from("public-photos").getPublicUrl(path).data.publicUrl; }
      catch (e) { return ""; }
    }
  };

  function readView(view, limit, orderCol) {
    if (!client) return ok([]);
    var q = client.from(view).select("*");
    if (orderCol) q = q.order(orderCol, { ascending: true });
    else if (view === "public_stories" || view === "public_photos") q = q.order("created_at", { ascending: false });
    if (limit) q = q.limit(limit);
    return safe(q);
  }
})();
