-- ============================================================================
-- Guerra Family Website — Supabase database schema
-- ----------------------------------------------------------------------------
-- WHAT THIS SETS UP
--   • A single "submissions" table that holds every contribution (stories,
--     photos, corrections, new-relative leads, research leads), each with a
--     moderation status: pending → approved / rejected.
--   • A safe public view ("public_stories") that exposes ONLY approved stories
--     and ONLY non-sensitive columns (never contributor emails).
--   • Row Level Security so the public can SUBMIT but never read private data
--     or self-approve, while the signed-in curator can read and moderate.
--
-- HOW TO RUN
--   1. In your Supabase project, open  SQL Editor → New query.
--   2. Paste this whole file and press RUN. It is safe to run more than once.
--   See docs/SUPABASE-SETUP.md for the full walkthrough.
-- ============================================================================

create extension if not exists "pgcrypto";   -- for gen_random_uuid()

-- ---- 1. The submissions table ---------------------------------------------
create table if not exists public.submissions (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  -- what kind of contribution this is
  type               text not null
                       check (type in ('story','photo','correction','new_person','lead')),
  -- moderation state
  status             text not null default 'pending'
                       check (status in ('pending','approved','rejected')),
  -- friendly, display-ready fields (the curator can tidy these on approval)
  title              text,
  about              text,
  body               text,
  evidence_status    text default 'unverified'
                       check (evidence_status in ('confirmed','likely','unverified','tradition')),
  -- the complete raw form, exactly as submitted, for any contribution type
  data               jsonb not null default '{}'::jsonb,
  -- contributor contact (PRIVATE — never exposed to the public view)
  contributor_name   text,
  contributor_email  text,
  -- curator's private working notes
  curator_notes      text
);

comment on table public.submissions is
  'All family contributions with a moderation status. Public may insert pending rows only.';

create index if not exists submissions_status_type_idx
  on public.submissions (status, type, created_at desc);

-- ---- 2. Keep updated_at current -------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_submissions_updated on public.submissions;
create trigger trg_submissions_updated
  before update on public.submissions
  for each row execute function public.set_updated_at();

-- ---- 3. Safe public view: approved stories only, no private columns --------
-- This view runs with the owner's rights, so the public can read approved
-- stories through it WITHOUT being able to read the underlying table directly.
create or replace view public.public_stories as
  select
    id,
    created_at,
    title,
    about,
    body,
    evidence_status,
    coalesce(nullif(contributor_name, ''), 'A family member') as contributor
  from public.submissions
  where type = 'story'
    and status = 'approved';

comment on view public.public_stories is
  'Intentionally exposes only approved stories and only non-sensitive columns.';

-- ---- 4. Row Level Security -------------------------------------------------
alter table public.submissions enable row level security;

-- Anyone may SUBMIT, but only as a pending row (they cannot self-approve).
drop policy if exists "public can submit pending" on public.submissions;
create policy "public can submit pending"
  on public.submissions
  for insert
  to anon, authenticated
  with check (status = 'pending');

-- Only the signed-in curator may READ the raw table (protects emails, etc.).
drop policy if exists "curator can read all" on public.submissions;
create policy "curator can read all"
  on public.submissions
  for select
  to authenticated
  using (true);

-- Only the signed-in curator may MODERATE (change status, edit, add notes).
drop policy if exists "curator can update" on public.submissions;
create policy "curator can update"
  on public.submissions
  for update
  to authenticated
  using (true)
  with check (true);

-- Only the signed-in curator may DELETE.
drop policy if exists "curator can delete" on public.submissions;
create policy "curator can delete"
  on public.submissions
  for delete
  to authenticated
  using (true);

-- ---- 5. Grants (RLS still applies on top of these) ------------------------
grant insert                     on public.submissions   to anon;
grant select, insert, update, delete on public.submissions to authenticated;
grant select                     on public.public_stories to anon, authenticated;

-- ============================================================================
-- Done. Next steps (see docs/SUPABASE-SETUP.md):
--   • Project Settings → API: copy your Project URL and anon public key into
--     assets/js/supabase-config.js
--   • Authentication → Users → Add user: create the curator's login
--   • Authentication → Providers: turn OFF public sign-ups so only you can log in
-- ============================================================================
