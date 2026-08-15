# Guerra Family Website — Project Plan & Strategy

A complete concept and implementation plan for the Guerra family-history website
(**guerraclan.org** / local build at `C:\Guerra`). This document explains *why* the site is
built the way it is, and how to run it as a living, community project. The reference site
[guerraclan.org] was used only as a contextual starting point; nothing was copied from it or from
any commercial genealogy platform.

---

## 1. Vision & goals

**Vision.** One welcoming, trustworthy home for what the Guerra family of Freixo da Serra knows
about itself — trees, records, photographs, and remembered stories — that older relatives and
younger researchers can both use with ease.

**Primary goals**

1. Teach the historical and geographic context of Freixo da Serra, Portugal.
2. Tell the Guerra family story across generations.
3. Present a browsable family-tree structure and family branches.
4. Share stories, memories, timelines, and migration paths.
5. Let anyone contribute findings, oral histories, photos, and corrections with minimal friction.
6. Collect new research leads.
7. Be transparent about what is confirmed, likely, unverified, or family tradition.

**Design qualities.** Warm · trustworthy · easy to navigate · respectful of heritage ·
research-friendly · community-driven · accessible to all ages · mobile- and desktop-friendly.

---

## 2. Audiences

| Audience | What they need | How the site serves them |
|---|---|---|
| Older relatives | Simple reading, large text, no logins | Clean prose pages, big tap targets, no account required |
| Younger researchers/descendants | Search, filters, evidence, sources | Family-tree filters, evidence tags, source lists |
| Serious genealogists | Method transparency, citations | Sources & Method page, per-person sources |
| Newcomers ("am I related?") | A friendly door in | Contact page invitation, low-friction contribution |
| Diaspora / emigrant branches | A way to reconnect across borders | Branches page, migration paths, diaspora contact role |

---

## 3. Information architecture (sitemap)

```
Home (index.html)
├── About the Family (about.html)
├── Freixo da Serra (freixo-da-serra.html)
├── Family Tree (family-tree.html)          ← searchable, filterable, per-person profiles
├── Family Branches (branches.html)         ← branch cards + migration paths
├── Stories & Memories (stories.html)
├── Contribute (contribute.html)            ← 5 tabbed forms (story/photo/correction/person/lead)
├── Sources & Method (sources.html)         ← evidence tiers + source types + paid-platform policy
├── Privacy & Ethics (privacy.html)         ← living persons, sensitive info, takedown process
└── Contact (contact.html)                  ← curator + family-historian + diaspora roles
```

**Navigation.** A single sticky top nav (defined in `assets/js/main.js`) appears on every page with
a persistent **"Share what you know"** call-to-action button. On mobile it collapses into a menu.
The footer repeats key links and the legal/privacy note.

---

## 4. Visual design system

Defined entirely in `assets/css/styles.css` via CSS custom properties (edit the `:root` block to
re-theme the whole site).

- **Palette** — a heritage "Serra" theme:
  - Forest green `#2f5d50` (primary, evokes the mountains) + dark `#22453b`
  - Parchment `#f7f2e9` background, paper `#fffdf8` cards
  - Terracotta `#b5643c` for calls-to-action; ochre/gold `#c1922f` accents
  - Warm near-black ink `#2b2620` for text
- **Evidence-status colours** (used site-wide, consistent with `sources.html`):
  confirmed = green, likely = blue, unverified = amber, family tradition = violet, living = muted red.
- **Typography** — an elegant serif stack for headings (Iowan / Palatino / Georgia) paired with a
  clean system sans-serif for body text. System fonts are used deliberately so the site loads
  instantly and works fully offline.
- **Components** — cards, hero, callouts, notes, timeline, evidence tags/pills, person cards,
  person-detail dialog, tabbed forms, buttons (primary/forest/ghost).
- **Accessibility** — skip link, semantic landmarks, visible focus rings, `aria-current` on the
  active nav item, live-region announcements on the tree, labelled form fields, reduced-motion
  support, and strong colour contrast.
- **Responsive** — fluid type via `clamp()`, grid layouts that collapse to one column on phones,
  a hamburger menu under 940px.

---

## 5. Feature set

| Feature | Where | How it works |
|---|---|---|
| Interactive family tree | `family-tree.html` + `tree.js` | Renders from `data/family.js`, grouped by generation |
| Search & filter | Family tree | By name, place, branch, generation, evidence status |
| Person profiles | Family tree | Click a person → dialog with dates, relatives, notes, sources |
| Relationship navigation | Person dialog | Click a parent/spouse/child to jump to them |
| Evidence-status tags | Tree, stories, timeline | Confirmed / Likely / Unverified / Family tradition |
| Living-person protection | Tree + data | `"living": true` auto-hides all personal detail |
| Branch overview cards | `branches.html` | Rendered from `data/family.js` branch list |
| Migration-path views | Branches, Freixo pages | Simple staged timelines |
| Timelines | Freixo, Branches | Local history + family-relevant milestones |
| Featured story spotlight | Home, Stories | Editable highlighted story format |
| Story submission | `contribute.html#panel-story` | Email + download, no account |
| Photo/document workflow | `contribute.html#panel-photo` | Describe → send → attach files to email |
| Correction requests | `contribute.html#panel-correction` | Straight to curator |
| New relative / branch | `contribute.html#panel-person` | Structured fields, blanks allowed |
| Research-lead intake | `contribute.html#panel-lead` | Captured and marked "unverified" |
| "Share what you know" callouts | Every page | Persistent nav CTA + in-page callouts |
| Moderation queue (concept) | See §7 | Curator reviews before publishing |

**Deliberately *not* built (yet):** user logins, a live database, direct file uploads, and
comment threads. These add cost, privacy risk, and maintenance burden. The plan favours a
**low-friction participation model** — email + downloadable files — that a volunteer family curator
can run indefinitely. §9 describes how to add server features later if the family wants them.

---

## 6. Content strategy (per section)

- **Home** — welcome, purpose, four "ways in" cards, featured stories, contribute CTA.
- **About** — project aims; what's known about the roots; how research is compiled; and the crucial
  caveat that not every "Guerra" belongs to this line.
- **Freixo da Serra** — geography (Gouveia, Guarda district, Serra da Estrela, Mondego source),
  history (wool/textile heritage), the 2013 parish merger into *Figueiró da Serra e Freixo da
  Serra*, a timeline, and why place matters in genealogy.
- **Family Tree** — the interactive core; every person carries an evidence tag and source list.
- **Branches** — paternal/maternal lines, key ancestors, migration paths, diaspora outreach.
- **Stories** — featured long-form story + a grid of shorter recollections; a gentle guide to what
  makes a good contribution.
- **Contribute** — five focused forms with sidebar guidance on evidence, review, privacy, and the
  no-paywalled-content rule.
- **Sources & Method** — the four evidence tiers, the source types used, and the responsible-use
  policy for Ancestry and other paid platforms.
- **Privacy & Ethics** — living-person policy, sensitive information, permissions, takedown process,
  community respect, contributor-data handling.
- **Contact** — curator/historian/diaspora role placeholders and all the ways to share findings.

All page copy shipped in this build is original, family-audience sample copy ready to be edited.

---

## 7. Contribution & moderation workflow

**Contributor experience (low friction).**
1. Visitor picks a form on `contribute.html`.
2. They fill it in (required fields are marked; the rest is optional; anonymity allowed).
3. They choose **Open email** (pre-filled to the curator) or **Download as a file** (to attach
   photos/scans and send).
4. A friendly confirmation explains what happens next.

**Curator moderation queue (recommended process).**
1. **Inbox = queue.** Contributions arrive as emails/files in one curator mailbox.
2. **Triage.** Sort into: ready to add · needs a follow-up question · privacy hold · low priority.
3. **Verify.** Check evidence; decide the correct evidence-status label.
4. **Protect.** Confirm no living-person detail is exposed without consent; strip sensitive detail.
5. **Publish.** Add to `data/family.js` (people/branches) or the relevant page, with sources.
6. **Acknowledge.** Thank the contributor; credit them as they requested.
7. **Log.** Keep a simple spreadsheet of what came in, its status, and where it landed.

A note on every form makes clear that submissions may be lightly edited for clarity, privacy, and
documentation quality before publishing.

---

## 8. Evidence & citation system

Four labels, defined on `sources.html` and stored per person in `data/family.js`:

- **Confirmed** — supported by a reviewed primary record.
- **Likely** — strong indirect evidence, not yet proven.
- **Unverified** — an unchecked lead or claim (default for anything from a paid platform).
- **Family tradition** — a handed-down story, attributed and dated.

Citations point to the **original record** (type, place, date) rather than a paywalled page.
Background/historical facts are summarised in original language from public reference sources.

---

## 9. Technical approach & future options

**Now (shipped):** pure static HTML/CSS/JS. No build tools, no dependencies, no server, works from
`file://`. Family data is a plain-language JavaScript file (`data/family.js`) loaded via a
`<script>` tag so the tree works even when opened directly from disk (avoiding browser `fetch()`
restrictions on local files).

**Later, if desired (optional, in rough order of effort):**
- Host the folder on a static host (Netlify, GitHub Pages, Cloudflare Pages) for a public URL.
- Add a hosted form service (Formspree/Netlify Forms/Google Forms) so submissions land in a
  dashboard instead of email — swap the handler in `assets/js/forms.js`.
- Add real photo uploads via that same form service or a shared cloud drive.
- If the tree grows very large, migrate `family.js` to a GEDCOM import or a small database and
  generate pages, keeping the same design system.
- Optional member accounts only if the family truly needs private/gated content.

---

## 10. Recommended local file/folder structure

See `README.md` for the full tree. Key rules:

- Keep all pages at the top level of `C:\Guerra` so links stay simple (`about.html`, etc.).
- Put images in `assets/img/`; reference them as `assets/img/yourphoto.jpg`.
- Keep **all family data in `data/family.js`** — it's the one file most edits touch.
- Don't rename `assets/…` files unless you update the `<script>`/`<link>` tags that load them.

---

## 11. Legal & ethical guardrails (summary)

- No copying of copyrighted text, images, trees, or record abstracts from Ancestry.com or any paid
  platform; use them only to identify research avenues, then summarise independently.
- No scraping or republishing of private, paywalled, or user-submitted third-party content.
- Material drawn only from a paid platform and not independently confirmed is marked *unverified*
  and flagged for manual review.
- No sensitive personal information about living individuals without consent; living people are
  hidden by default.
- Privacy guidance, contributor guidance, and moderation recommendations appear throughout the site.

---

## 12. Suggested roadmap

- **Phase 1 — Foundation (this package).** Site structure, design system, sample data, forms, docs.
- **Phase 2 — Seed real data.** Curator replaces sample people with documented relatives; sets the
  curator email; fills in role placeholders on Contact.
- **Phase 3 — Invite the family.** Share the site; run the first round of contributions through the
  moderation workflow; publish the first real stories and photos.
- **Phase 4 — Publish online.** Move to a static host for a public URL; optionally add a form service.
- **Phase 5 — Grow & sustain.** Regular curation, periodic evidence review, and outreach to
  emigrant/diaspora branches.
```
