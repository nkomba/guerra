/* ==========================================================================
   supabase-config.js — connect the site to your Supabase backend
   --------------------------------------------------------------------------
   These two values are filled in with THIS project's settings.

     • SUPABASE_URL must be the PROJECT BASE URL only — no "/rest/v1/" on the
       end. (The Supabase client adds "/rest/v1", "/auth/v1", "/storage/v1"
       itself. db.js also strips a stray "/rest/v1" defensively, just in case.)
     • SUPABASE_ANON_KEY is the PUBLISHABLE key (sb_publishable_...). It is
       SAFE to ship in the browser: Row Level Security decides what it can do.

   NEVER put the "secret" / service_role key in this file or anywhere in the
   website — that key bypasses all security. Keep it only in the Supabase
   dashboard / server-side.
   ========================================================================== */

window.SUPABASE_URL      = "https://igzehzyjhgbzrivmckbg.supabase.co";
window.SUPABASE_ANON_KEY = "sb_publishable_8lyMhQF8ed-WnL0q1QOxWw_zJSS07Nd";
