-- ============================================================================
-- Guerra Family Website — Supabase schema  (v2: full family-history model)
-- ----------------------------------------------------------------------------
-- WHAT THIS FILE DOES
--   Sets up a small, SECURE, genealogy data model plus safe public access:
--     • profiles            — one row per signed-in user (member or curator)
--     • family_branches     — the lines of the family
--     • places              — optional lookup of parishes/towns
--     • people              — individuals (living people are auto-masked)
--     • relationships       — parent / spouse / child edges of the tree
--     • stories             — curated stories & memories
--     • sources             — citations / evidence
--     • photos              — photo metadata (files live in Storage)
--     • submissions         — low-friction PUBLIC intake (anonymous allowed)
--   Public visitors read ONLY through "public_*" views that expose approved,
--   non-private rows and hide living-people details. Contributor emails and
--   unapproved data are never publicly readable.
--
-- SECURITY MODEL (least privilege)
--   • anon (public, not logged in):
--        - may INSERT into `submissions` as status='pending' only
--        - may SELECT the `public_*` views only
--   • authenticated members:
--        - may submit stories/sources/photos they OWN (is_approved forced false)
--        - may read/edit/delete only their OWN not-yet-approved rows
--   • curator (a member whose profiles.role = 'curator'):
--        - may read everything and approve/edit/delete anything
--   auth.uid() is NULL for anon, so every policy is written to behave correctly
--   when there is no session (anon never matches an ownership/curator check).
--
-- HOW TO RUN:  Supabase → SQL Editor → paste this whole file → Run.
--              Safe to run more than once (idempotent).
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- 0.  Roles helper — is the current user the curator?
--     SECURITY DEFINER so it can read `profiles` without tripping RLS/recursion.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role         text not null default 'member' check (role in ('member','curator')),
  created_at   timestamptz not null default now()
);

create or replace function public.is_curator()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'curator'
  );
$$;

-- Auto-create a profile row the first time a user signs in.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email,'@',1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 1.  Reference tables
-- ---------------------------------------------------------------------------
create table if not exists public.family_branches (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique,
  name         text not null,
  lead         text,
  description  text,
  key_ancestors text,
  migration    text,
  is_public    boolean not null default true,
  created_at   timestamptz not null default now()
);

create table if not exists public.places (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  parish       text,
  municipality text,
  district     text,
  country      text default 'Portugal',
  notes        text
);

-- ---------------------------------------------------------------------------
-- 2.  People + relationships (the family tree)
--     `living_person = true` triggers automatic masking in public_people.
-- ---------------------------------------------------------------------------
create table if not exists public.people (
  id            uuid primary key default gen_random_uuid(),
  full_name     text not null,
  sex           text check (sex in ('M','F','?')) default '?',
  generation    int,
  branch_id     uuid references public.family_branches(id) on delete set null,
  place_id      uuid references public.places(id) on delete set null,
  living_person boolean not null default false,
  birth_date    text,
  birth_place   text,
  death_date    text,
  death_place   text,
  notes         text,
  evidence_status text not null default 'unverified'
                  check (evidence_status in ('confirmed','likely','unverified','tradition')),
  -- moderation / ownership
  is_public     boolean not null default true,
  is_approved   boolean not null default false,
  submitted_by  uuid references auth.users(id) on delete set null,
  reviewed_by   uuid references auth.users(id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists people_branch_idx   on public.people (branch_id);
create index if not exists people_approved_idx  on public.people (is_approved, is_public);

create table if not exists public.relationships (
  id          uuid primary key default gen_random_uuid(),
  person_id   uuid not null references public.people(id) on delete cascade,
  relative_id uuid not null references public.people(id) on delete cascade,
  type        text not null check (type in ('parent','spouse','child')),
  is_approved boolean not null default false,
  created_at  timestamptz not null default now(),
  unique (person_id, relative_id, type)
);
create index if not exists rel_person_idx   on public.relationships (person_id);
create index if not exists rel_relative_idx on public.relationships (relative_id);

-- ---------------------------------------------------------------------------
-- 3.  Stories, sources, photos (curated content)
-- ---------------------------------------------------------------------------
create table if not exists public.stories (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  about         text,
  body          text not null,
  evidence_status text not null default 'unverified'
                  check (evidence_status in ('confirmed','likely','unverified','tradition')),
  person_id     uuid references public.people(id) on delete set null,
  living_sensitive boolean not null default false,  -- hide if it exposes a living person
  is_public     boolean not null default true,
  is_approved   boolean not null default false,
  submitted_by  uuid references auth.users(id) on delete set null,
  reviewed_by   uuid references auth.users(id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists stories_approved_idx on public.stories (is_approved, is_public, living_sensitive);

create table if not exists public.sources (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  citation      text,
  source_type   text,          -- e.g. 'parish', 'civil', 'census', 'oral', 'photo'
  url           text,
  person_id     uuid references public.people(id) on delete set null,
  story_id      uuid references public.stories(id) on delete set null,
  is_public     boolean not null default true,
  is_approved   boolean not null default false,
  submitted_by  uuid references auth.users(id) on delete set null,
  reviewed_by   uuid references auth.users(id) on delete set null,
  created_at    timestamptz not null default now()
);

create table if not exists public.photos (
  id            uuid primary key default gen_random_uuid(),
  bucket_id     text not null default 'family-photos',  -- 'family-photos'(private) or 'public-photos'
  storage_path  text not null,                          -- object path within the bucket
  caption       text,
  depicts       text,
  taken_date    text,
  person_id     uuid references public.people(id) on delete set null,
  living_sensitive boolean not null default false,
  is_public     boolean not null default false,         -- only true once curator publishes
  is_approved   boolean not null default false,
  submitted_by  uuid references auth.users(id) on delete set null,
  reviewed_by   uuid references auth.users(id) on delete set null,
  created_at    timestamptz not null default now()
);
create index if not exists photos_approved_idx on public.photos (is_approved, is_public, living_sensitive);

-- ---------------------------------------------------------------------------
-- 4.  Submissions — the public, low-friction intake queue (anonymous allowed)
--     (This is the table the current Contribute forms already write to.)
-- ---------------------------------------------------------------------------
create table if not exists public.submissions (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  type               text not null
                       check (type in ('story','photo','correction','new_person','lead')),
  status             text not null default 'pending'
                       check (status in ('pending','approved','rejected')),
  title              text,
  about              text,
  body               text,
  evidence_status    text default 'unverified'
                       check (evidence_status in ('confirmed','likely','unverified','tradition')),
  data               jsonb not null default '{}'::jsonb,
  contributor_name   text,
  contributor_email  text,   -- PRIVATE: never exposed through a public view
  curator_notes      text,
  submitted_by       uuid references auth.users(id) on delete set null,  -- null for anonymous
  reviewed_by        uuid references auth.users(id) on delete set null
);
create index if not exists submissions_status_idx on public.submissions (status, type, created_at desc);

-- ---------------------------------------------------------------------------
-- 5.  updated_at triggers
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

do $$
declare t text;
begin
  foreach t in array array['people','stories','submissions'] loop
    execute format('drop trigger if exists trg_%1$s_updated on public.%1$s;', t);
    execute format('create trigger trg_%1$s_updated before update on public.%1$s
                    for each row execute function public.set_updated_at();', t);
  end loop;
end $$;

-- ===========================================================================
-- 6.  PUBLIC-SAFE VIEWS  (what anonymous visitors are allowed to read)
--     Owner-rights views: they surface only approved/public rows and mask
--     living-people details, without granting access to the base tables.
-- ===========================================================================

-- People: living individuals appear as a masked node so the tree still links,
-- but ALL of their personal details are withheld.
create or replace view public.public_people as
select
  id,
  case when living_person then 'Living relative (details withheld)' else full_name end as full_name,
  case when living_person then null else sex end          as sex,
  generation,
  branch_id,
  living_person,
  case when living_person then null else birth_date end   as birth_date,
  case when living_person then null else birth_place end  as birth_place,
  case when living_person then null else death_date end   as death_date,
  case when living_person then null else death_place end  as death_place,
  case when living_person then null else notes end        as notes,
  evidence_status
from public.people
where is_approved and is_public;

create or replace view public.public_relationships as
select r.id, r.person_id, r.relative_id, r.type
from public.relationships r
where r.is_approved
  and exists (select 1 from public.people p where p.id = r.person_id   and p.is_approved and p.is_public)
  and exists (select 1 from public.people p where p.id = r.relative_id and p.is_approved and p.is_public);

create or replace view public.public_family_branches as
select id, slug, name, lead, description, key_ancestors, migration
from public.family_branches
where is_public;

-- Stories: UNION of (a) approved story-type submissions — so the existing
-- Contribute→approve flow keeps working — and (b) the curated stories table.
create or replace view public.public_stories as
  select
    s.id, s.created_at, s.title, s.about, s.body, s.evidence_status,
    coalesce(nullif(s.contributor_name,''), 'A family member') as contributor
  from public.submissions s
  where s.type = 'story' and s.status = 'approved'
union all
  select
    st.id, st.created_at, st.title, st.about, st.body, st.evidence_status,
    coalesce(nullif(p.display_name,''), 'A family member') as contributor
  from public.stories st
  left join public.profiles p on p.id = st.submitted_by
  where st.is_approved and st.is_public and not st.living_sensitive;

create or replace view public.public_sources as
select id, title, citation, source_type, url, person_id, story_id
from public.sources
where is_approved and is_public;

-- Photos: only APPROVED, public, non-living-sensitive images, and only those
-- stored in the public bucket (so private originals never leak a URL).
create or replace view public.public_photos as
select id, bucket_id, storage_path, caption, depicts, taken_date, person_id, created_at
from public.photos
where is_approved and is_public and not living_sensitive and bucket_id = 'public-photos';

-- ===========================================================================
-- 7.  ROW LEVEL SECURITY
-- ===========================================================================
alter table public.profiles        enable row level security;
alter table public.family_branches enable row level security;
alter table public.places          enable row level security;
alter table public.people          enable row level security;
alter table public.relationships   enable row level security;
alter table public.stories         enable row level security;
alter table public.sources         enable row level security;
alter table public.photos          enable row level security;
alter table public.submissions     enable row level security;

-- ---- profiles -------------------------------------------------------------
drop policy if exists profiles_self_read   on public.profiles;
drop policy if exists profiles_self_write  on public.profiles;
drop policy if exists profiles_curator_all on public.profiles;
create policy profiles_self_read   on public.profiles for select to authenticated using (id = auth.uid() or public.is_curator());
create policy profiles_self_write  on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy profiles_curator_all on public.profiles for all    to authenticated using (public.is_curator()) with check (public.is_curator());

-- ---- reference tables: public read (curated), curator writes --------------
drop policy if exists branches_read on public.family_branches;
drop policy if exists branches_curator on public.family_branches;
create policy branches_read    on public.family_branches for select to anon, authenticated using (is_public or public.is_curator());
create policy branches_curator on public.family_branches for all    to authenticated using (public.is_curator()) with check (public.is_curator());

drop policy if exists places_read on public.places;
drop policy if exists places_curator on public.places;
create policy places_read    on public.places for select to anon, authenticated using (true);
create policy places_curator on public.places for all    to authenticated using (public.is_curator()) with check (public.is_curator());

-- ---- people / relationships: base tables NOT readable by anon (use views) -
drop policy if exists people_read on public.people;
drop policy if exists people_member_insert on public.people;
drop policy if exists people_owner_or_curator on public.people;
create policy people_read on public.people for select to authenticated
  using (public.is_curator() or submitted_by = auth.uid());
create policy people_member_insert on public.people for insert to authenticated
  with check (submitted_by = auth.uid() and is_approved = false);
create policy people_owner_or_curator on public.people for all to authenticated
  using (public.is_curator() or (submitted_by = auth.uid() and is_approved = false))
  with check (public.is_curator() or (submitted_by = auth.uid() and is_approved = false));

drop policy if exists rel_read on public.relationships;
drop policy if exists rel_curator on public.relationships;
create policy rel_read    on public.relationships for select to authenticated using (public.is_curator());
create policy rel_curator on public.relationships for all    to authenticated using (public.is_curator()) with check (public.is_curator());

-- ---- stories: members submit & manage own drafts; curator all -------------
drop policy if exists stories_read on public.stories;
drop policy if exists stories_member_insert on public.stories;
drop policy if exists stories_owner_or_curator on public.stories;
create policy stories_read on public.stories for select to authenticated
  using (public.is_curator() or submitted_by = auth.uid());
create policy stories_member_insert on public.stories for insert to authenticated
  with check (submitted_by = auth.uid() and is_approved = false);
create policy stories_owner_or_curator on public.stories for all to authenticated
  using (public.is_curator() or (submitted_by = auth.uid() and is_approved = false))
  with check (public.is_curator() or (submitted_by = auth.uid() and is_approved = false));

-- ---- sources (same ownership pattern) -------------------------------------
drop policy if exists sources_read on public.sources;
drop policy if exists sources_member_insert on public.sources;
drop policy if exists sources_owner_or_curator on public.sources;
create policy sources_read on public.sources for select to authenticated
  using (public.is_curator() or submitted_by = auth.uid());
create policy sources_member_insert on public.sources for insert to authenticated
  with check (submitted_by = auth.uid() and is_approved = false);
create policy sources_owner_or_curator on public.sources for all to authenticated
  using (public.is_curator() or (submitted_by = auth.uid() and is_approved = false))
  with check (public.is_curator() or (submitted_by = auth.uid() and is_approved = false));

-- ---- photos (metadata; same ownership pattern) ----------------------------
drop policy if exists photos_read on public.photos;
drop policy if exists photos_member_insert on public.photos;
drop policy if exists photos_owner_or_curator on public.photos;
create policy photos_read on public.photos for select to authenticated
  using (public.is_curator() or submitted_by = auth.uid());
create policy photos_member_insert on public.photos for insert to authenticated
  with check (submitted_by = auth.uid() and is_approved = false);
create policy photos_owner_or_curator on public.photos for all to authenticated
  using (public.is_curator() or (submitted_by = auth.uid() and is_approved = false))
  with check (public.is_curator() or (submitted_by = auth.uid() and is_approved = false));

-- ---- submissions: anyone may submit as pending; owner/curator can read -----
drop policy if exists submissions_public_insert on public.submissions;
drop policy if exists submissions_read on public.submissions;
drop policy if exists submissions_update on public.submissions;
drop policy if exists submissions_delete on public.submissions;
create policy submissions_public_insert on public.submissions for insert to anon, authenticated
  with check (status = 'pending' and (submitted_by is null or submitted_by = auth.uid()));
create policy submissions_read on public.submissions for select to authenticated
  using (public.is_curator() or submitted_by = auth.uid());
create policy submissions_update on public.submissions for update to authenticated
  using (public.is_curator() or (submitted_by = auth.uid() and status = 'pending'))
  with check (public.is_curator() or (submitted_by = auth.uid() and status = 'pending'));
create policy submissions_delete on public.submissions for delete to authenticated
  using (public.is_curator() or (submitted_by = auth.uid() and status = 'pending'));

-- ===========================================================================
-- 8.  GRANTS  (RLS still applies on top of these)
-- ===========================================================================
grant usage on schema public to anon, authenticated;

-- base-table privileges (RLS decides the rows)
grant insert on public.submissions to anon;
grant select, insert, update, delete on public.submissions to authenticated;
grant select, insert, update, delete on
  public.people, public.relationships, public.stories, public.sources,
  public.photos, public.family_branches, public.places, public.profiles
  to authenticated;

-- public read of the safe views only
grant select on
  public.public_people, public.public_relationships, public.public_family_branches,
  public.public_stories, public.public_sources, public.public_photos
  to anon, authenticated;

-- ===========================================================================
-- 9.  STORAGE  (family photos & documents)
--     Two buckets:
--       • family-photos  (PRIVATE) — intake/originals; per-user folders;
--         readable only by the owner or the curator.
--       • public-photos  (PUBLIC read) — curator-approved images for display.
--     Uploads must go to a folder named after the uploader's user id:
--         family-photos/<auth.uid()>/<filename>
-- ===========================================================================
insert into storage.buckets (id, name, public)
values ('family-photos','family-photos', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('public-photos','public-photos', true)
on conflict (id) do nothing;

-- family-photos (private): owner-or-curator access, per-user folder on upload
drop policy if exists "family-photos read"   on storage.objects;
drop policy if exists "family-photos insert" on storage.objects;
drop policy if exists "family-photos modify" on storage.objects;
drop policy if exists "family-photos delete" on storage.objects;
create policy "family-photos read" on storage.objects for select to authenticated
  using (bucket_id = 'family-photos' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_curator()));
create policy "family-photos insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'family-photos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "family-photos modify" on storage.objects for update to authenticated
  using (bucket_id = 'family-photos' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_curator()));
create policy "family-photos delete" on storage.objects for delete to authenticated
  using (bucket_id = 'family-photos' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_curator()));

-- public-photos: anyone may read; only the curator may write.
drop policy if exists "public-photos read"   on storage.objects;
drop policy if exists "public-photos write"  on storage.objects;
create policy "public-photos read" on storage.objects for select to anon, authenticated
  using (bucket_id = 'public-photos');
create policy "public-photos write" on storage.objects for all to authenticated
  using (bucket_id = 'public-photos' and public.is_curator())
  with check (bucket_id = 'public-photos' and public.is_curator());

-- ===========================================================================
-- 10.  CURATOR BOOTSTRAP  (run once, after creating the curator auth user)
--      Find the user id in Authentication → Users, then:
--        update public.profiles set role = 'curator' where id = '<USER-UUID>';
--      (The profile row is created automatically on first sign-in.)
-- ===========================================================================
-- Done.
