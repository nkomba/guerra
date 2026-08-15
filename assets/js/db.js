/* ==========================================================================
   db.js — the small "data layer" between the website and Supabase
   --------------------------------------------------------------------------
   Every page that talks to the backend loads (in this order):
       <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
       <script src="assets/js/supabase-config.js"></script>
       <script src="assets/js/db.js"></script>
   This file exposes a single friendly object, window.GuerraDB, with:
       GuerraDB.ready          → true only when Supabase is configured & loaded
       GuerraDB.client         → the raw Supabase client (used by admin.js)
       GuerraDB.submit(row)    → save a new pending contribution
       GuerraDB.stories()      → fetch approved stories for the public feed
   If Supabase isn't configured yet, GuerraDB.ready is false and the rest of
   the site quietly falls back to its offline behaviour. No errors, no fuss.
   ========================================================================== */
(function () {
  "use strict";

  var URL = window.SUPABASE_URL || "";
  var KEY = window.SUPABASE_ANON_KEY || "";

  // "Configured" means the placeholders have actually been replaced.
  var configured =
    URL && KEY &&
    URL.indexOf("YOUR-PROJECT") === -1 &&
    KEY.indexOf("YOUR-") === -1;

  var client = null;
  if (configured && window.supabase && typeof window.supabase.createClient === "function") {
    try {
      client = window.supabase.createClient(URL, KEY);
    } catch (e) {
      // Leave client null → site stays in offline mode.
      if (window.console) console.warn("Supabase client failed to initialise:", e);
    }
  }

  window.GuerraDB = {
    ready: !!client,
    client: client,

    // Save a new contribution. Always inserted as status 'pending'.
    // Returns the Supabase promise: { data, error }.
    submit: function (row) {
      if (!client) return Promise.resolve({ error: { message: "Backend not configured" } });
      row = row || {};
      row.status = "pending"; // never allow a submission to arrive pre-approved
      return client.from("submissions").insert([row]);
    },

    // Fetch approved stories for the public "Shared by the family" feed.
    stories: function (limit) {
      if (!client) return Promise.resolve({ data: [], error: null });
      var q = client.from("public_stories").select("*").order("created_at", { ascending: false });
      if (limit) q = q.limit(limit);
      return q;
    }
  };
})();
