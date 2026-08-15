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

## Step 3 — Your keys are already filled in

`assets/js/supabase-config.js` is already set to this project:

```js
window.SUPABASE_URL      = "https://igzehzyjhgbzrivmckbg.supabase.co";
window.SUPABASE_ANON_KEY = "sb_publishable_8lyMhQF8ed-WnL0q1QOxWw_zJSS07Nd";
```

Two things to know:

- **The URL is the base project URL — no `/rest/v1/` on the end.** The Supabase client adds that
  itself. (If you ever re-paste it, use `https://igzehzyjhgbzrivmckbg.supabase.co`, not the REST URL.
  `db.js` also strips a stray `/rest/v1` defensively.)
- **The key is your publishable key (`sb_publishable_…`)**, which is the correct key for browser code.
  It is safe to publish; Row Level Security decides what it can do. **Never** put the `secret` /
  `service_role` key in the website — that one bypasses all security.

> If you ever rotate the publishable key in Supabase, update it here and redeploy.

## Step 4 — Create the curator login

1. In Supabase, open **Authentication** → **Users** → **Add user** → **Create new user**.
2. Enter the curator's **email** and a **password**, and (importantly) tick **Auto Confirm User** so
   the account is active immediately.
3. Recommended: open **Authentication → Sign In / Providers** and **turn OFF "Allow new users to sign
   up."** This means only accounts you create by hand (like the curator) can ever log in.
4. **Mark that user as the curator.** A profile row is created automatically the first time they sign
   in. To grant curator powers, open **SQL Editor** and run (using the user's id from Authentication →
   Users):

   ```sql
   update public.profiles set role = 'curator' where id = '<THE-USER-UUID>';
   ```

   Until you do this, signing in to `admin.html` shows a yellow banner and you'll only see your own
   submissions — that's the security model working (only curators can read everyone's submissions and
   approve content). The banner shows the exact id to paste.

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

## Photos & family-member accounts (optional)

`schema.sql` also creates two storage buckets and a small family-history data model:

- **`family-photos`** (private): where signed-in family members upload photos/scans, into a folder
  named after their own user id. Only the uploader and the curator can see them.
- **`public-photos`** (public): where the curator places approved, non-sensitive images for public
  display.

Uploading a file requires sign-in (anonymous file uploads are an abuse risk and photos can show living
people). On the Contribute → *photo* tab, signed-in users see a real uploader; everyone else uses the
describe-and-email flow, which still works. To let a relative upload, create them a user in
Authentication → Users (leave their profile role as the default `member`).

The schema also adds `people`, `relationships`, `family_branches`, `places`, `stories`, `sources`, and
`photos` tables with moderation fields, plus public-safe views (`public_people`, `public_stories`, …).
The public family tree still reads `data/family.js` for now; when you're ready to move the tree into
the database, the `public_people` / `public_relationships` views and `GuerraDB.people()` reader are
already in place.

## Files added or changed for the backend

```
NEW   supabase/schema.sql              Full data model, public-safe views, RLS, storage buckets/policies
EDIT  assets/js/supabase-config.js     Your Project URL + publishable key (already filled in)
EDIT  assets/js/db.js                  Data layer: submit + readers (stories/people/branches/photos), URL-safe
NEW   assets/js/storage.js             Signed-in photo uploader → family-photos bucket
NEW   assets/js/admin.js               Dashboard logic (curator check + reviewed_by)
NEW   admin.html                       Private curator dashboard
EDIT  docs/SUPABASE-SETUP.md           This guide
EDIT  assets/js/forms.js               Forms submit online (email/download kept)
EDIT  contribute.html                  Loads backend scripts; photo uploader slot; forms tagged by type
EDIT  stories.html                     Adds the live "Shared by the family" feed
```
