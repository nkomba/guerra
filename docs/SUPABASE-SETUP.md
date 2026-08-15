# Connecting the free Supabase backend

This guide turns the site from "offline sample" mode into a **live, dynamic** family website:
visitors' contributions are saved to a real database, and the curator reviews and publishes them
from a private dashboard. It uses **Supabase**, which has a free tier that is generous for a family
project. Budget about **20–30 minutes**, once.

You do **not** need to be a programmer. You'll copy two keys and run one block of SQL.

> **What stays the same:** the family tree still reads from `data/family.js` (that was the chosen
> scope). The backend handles *contributions and stories*. Everything is built so the tree can move
> into the database later without a rewrite.

---

## What you'll end up with

- Contribution forms on `contribute.html` that **save online** to your database (with email/download
  kept as fallbacks).
- A private **curator dashboard** at `admin.html` to approve, edit, reject, or delete submissions.
- Approved **stories publish automatically** to the public `stories.html` feed.
- Security so the public can *submit* but can never read private data or self-approve.

---

## Step 1 — Create a free Supabase project

1. Go to **https://supabase.com** and sign up (free). No credit card required.
2. Click **New project**. Give it a name (e.g. `guerra-family`), set a strong **database password**
   (save it somewhere safe), pick a region near you, and create it.
3. Wait a minute or two while it sets up.

## Step 2 — Create the database tables

1. In your project, open **SQL Editor** (left sidebar) → **New query**.
2. Open the file **`supabase/schema.sql`** from this website package, copy **all** of it, paste it
   into the query box, and click **Run**.
3. You should see "Success". This created the `submissions` table, the safe `public_stories` view,
   and all the security rules. (It's safe to run again if you ever need to.)

## Step 3 — Copy your keys into the site

1. In Supabase, open **Project Settings** (gear icon) → **API**.
2. Find these two values:
   - **Project URL** — looks like `https://abcdxyz.supabase.co`
   - **Project API keys → `anon` `public`** — a long string starting with `ey...`
3. Open **`assets/js/supabase-config.js`** in a text editor and paste them in:

   ```js
   window.SUPABASE_URL      = "https://abcdxyz.supabase.co";   // your Project URL
   window.SUPABASE_ANON_KEY = "eyJhbGciOi...your-anon-key...";  // your anon public key
   ```

4. Save the file.

> **Is the anon key safe to publish?** Yes. It is designed to live in a public website; the database
> security rules decide what it can do (submit only). **Never** paste the `service_role` key anywhere
> in the website — that one bypasses security. Keep it secret.

## Step 4 — Create the curator login

1. In Supabase, open **Authentication** → **Users** → **Add user** → **Create new user**.
2. Enter the curator's **email** and a **password**, and (importantly) tick **Auto Confirm User** so
   the account is active immediately.
3. Recommended: open **Authentication → Sign In / Providers** and **turn OFF "Allow new users to sign
   up."** This means only accounts you create by hand (like the curator) can ever log in.

## Step 5 — Publish the updated site

Upload the updated website files to your host for **guerraclan.org** (the same way the current site is
deployed). The new/changed files are listed at the bottom of this guide. Once live:

- `https://guerraclan.org/contribute.html` — forms now submit online.
- `https://guerraclan.org/admin.html` — the curator dashboard (log in with the account from Step 4).

## Step 6 — Test it end to end

1. Visit `contribute.html` on the live site, fill in a **story**, and click **Submit online to the
   curator**. You should see a "thank you — waiting for review" message.
2. Visit `admin.html`, sign in, and you should see your test story under **Pending**.
3. Tidy the wording if you like, choose an **evidence label**, and click **Save & Approve**.
4. Visit `stories.html` — your approved story now appears under **"Shared by the family."**
5. Success! Delete the test story from the dashboard if you wish.

---

## How moderation works (day to day)

- Every submission arrives as **Pending**. Nothing is public until you approve it.
- In `admin.html` you can **edit** the title/body/about before publishing, add **private curator
  notes**, and set the **evidence label** for stories (Confirmed / Likely / Unverified / Family
  tradition).
- **Save & Approve** publishes stories to the public feed. **Reject** hides it. **Delete** removes it.
- For a *new-relative* or *correction* submission, use its details to update the family tree in
  `data/family.js` (see `docs/CONTENT-EDITING-GUIDE.md`), then approve or delete the submission to
  clear it from your queue.

## Privacy & safety notes

- Contributor **email addresses are visible only in the dashboard**, never on the public site (the
  public feed uses a view that omits them).
- The public can only **insert pending** rows — they cannot read the table, edit anything, or approve
  their own submissions. This is enforced by the database, not just the page.
- Keep publishing your usual privacy practices: don't approve anything that exposes a living person's
  private details without consent (see `privacy.html`).

## Costs

- Supabase free tier is ample for a family project. If the project is ever paused for inactivity
  (which can happen on the free tier), you simply resume it from the dashboard.
- The only routine cost is your domain name; hosting and Supabase are free at this scale.

## Troubleshooting

- **Dashboard says "backend isn't connected."** `supabase-config.js` still has the placeholder
  values, or wasn't uploaded. Re-check Step 3.
- **Forms don't show the online button.** Same cause — the site can't see your keys. On the live site,
  hard-refresh (Ctrl/Cmd+Shift+R).
- **"new row violates row-level security."** The SQL from Step 2 didn't run fully — re-run
  `supabase/schema.sql`.
- **Can't log in.** Make sure the user was **Auto Confirmed** (Step 4). Reset the password from
  Authentication → Users if needed.
- **Testing locally from `C:\`** may be blocked by the browser for security reasons; test on the live
  `guerraclan.org` site, or run a local web server. The offline fallbacks (email/download, sample
  stories) always work either way.

---

## Files added or changed for the backend

```
NEW   supabase/schema.sql              Database tables, view, and security rules
NEW   assets/js/supabase-config.js     ← paste your two keys here
NEW   assets/js/db.js                  Small data layer (submit + fetch stories)
NEW   assets/js/admin.js               Dashboard logic
NEW   admin.html                       Private curator dashboard
NEW   docs/SUPABASE-SETUP.md           This guide
EDIT  assets/js/forms.js               Forms now submit online (email/download kept)
EDIT  contribute.html                  Loads the backend scripts; forms tagged by type
EDIT  stories.html                     Adds the live "Shared by the family" feed
```
