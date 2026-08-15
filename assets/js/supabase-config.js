/* ==========================================================================
   supabase-config.js — connect the site to your (free) Supabase backend
   --------------------------------------------------------------------------
   FILL IN THE TWO VALUES BELOW, then save. That's the only editing needed to
   switch the site from "offline sample" mode to a live, dynamic backend.

   Where to find them:
     Supabase dashboard → your project → Project Settings → API
       • "Project URL"        → paste as SUPABASE_URL
       • "anon" "public" key  → paste as SUPABASE_ANON_KEY

   IMPORTANT
     • The anon/public key is DESIGNED to be shared in a website. It is safe
       here because Row Level Security (see supabase/schema.sql) controls what
       it can actually do (submit only; no reading of private data).
     • NEVER paste the "service_role" key into this file or anywhere in the
       website — that key bypasses all security. Keep it secret.

   Until you fill these in, the site runs in offline mode: the contribution
   forms fall back to email/download and the live stories feed stays hidden.
   ========================================================================== */

window.SUPABASE_URL      = "https://YOUR-PROJECT.supabase.co";
window.SUPABASE_ANON_KEY = "YOUR-ANON-PUBLIC-KEY";
