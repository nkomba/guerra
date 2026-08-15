# The Guerra Family of Freixo da Serra — Family History Website

A warm, community-driven, static family-history website for the Guerra family with roots in
**Freixo da Serra, Gouveia, Guarda district, Portugal**. Family members, researchers, and
descendants can explore the family tree, read stories, and contribute their own findings,
memories, documents, and photos.

This package is designed to live at **`C:\Guerra`** on a Windows computer and can be opened with
no server, no build step, and no account system. Just double-click `index.html`.

---

## Quick start

1. Put this whole `Guerra` folder wherever you like — the intended home is `C:\Guerra`.
2. Double-click **`index.html`** to open the site in your web browser.
3. That's it. Every page works offline, straight from your hard drive.

To put it online later, upload the entire folder to any static web host (see
`docs/PROJECT-PLAN.md` → *Hosting*).

---

## What's inside

```
C:\Guerra\
├── index.html              Home
├── about.html              About the Family
├── freixo-da-serra.html    Freixo da Serra — place & history
├── family-tree.html        Interactive, searchable family tree
├── branches.html           Family branches & migration paths
├── stories.html            Stories & memories
├── contribute.html         Contribution forms (story, photo, correction, new person, lead)
├── sources.html            Sources & evidence-status method
├── privacy.html            Privacy & ethics policy
├── contact.html            Contact & curator roles
│
├── assets/
│   ├── css/styles.css      The single design-system stylesheet (colours, type, components)
│   ├── js/main.js          Shared header + footer + mobile menu (edit navigation here)
│   ├── js/tree.js          Family-tree rendering, search, filters, person profiles
│   ├── js/forms.js         Contribution forms → email + downloadable file (set curator email here)
│   └── img/                Put your own photographs and images here
│
├── admin.html              Private curator dashboard (moderate submissions) — backend only
│
├── assets/js/
│   ├── supabase-config.js  ← paste your Supabase URL + anon key here to go live
│   ├── db.js               Data layer (submit contributions, fetch approved stories)
│   └── admin.js            Dashboard logic
│
├── supabase/
│   └── schema.sql          Run this once in Supabase to create the database + security
│
├── data/
│   └── family.js           ★ YOUR FAMILY DATA — edit this to add real relatives & branches
│
├── docs/
│   ├── PROJECT-PLAN.md          Full strategy, architecture, features, workflow, roadmap
│   ├── CONTENT-EDITING-GUIDE.md Plain-language guide for non-technical family editors
│   └── SUPABASE-SETUP.md        Step-by-step: connect the free dynamic backend
│
└── README.md               This file
```

---

## Two ways to run this site

**1. Offline / static (default).** Do nothing extra. Contributions arrive by email or downloadable
file; the curator edits `data/family.js` by hand. Works straight from `C:\Guerra`.

**2. Dynamic backend (optional, free).** Connect a free **Supabase** database so contributions are
submitted online, moderated in a private dashboard (`admin.html`), and approved stories publish
themselves to the Stories page. The family tree still reads from `data/family.js`.

To turn on the backend, follow **`docs/SUPABASE-SETUP.md`** — about 20–30 minutes, once. In short:
create a free Supabase project, run `supabase/schema.sql`, paste two keys into
`assets/js/supabase-config.js`, and create the curator's login. Until you do this, the site simply
stays in offline mode with no errors.

---

## The three things you'll most likely edit

1. **Add relatives** → open `data/family.js` and follow the examples. No coding needed.
   Full walkthrough in `docs/CONTENT-EDITING-GUIDE.md`.
2. **Set the curator's email** → open `assets/js/forms.js` and change the line near the top:
   `var CURATOR_EMAIL = "curator@guerraclan.org";`
3. **Edit page words / sample copy** → open any `.html` file in a text editor and type over the
   existing text between the tags.

---

## Important principles built into this site

- **Privacy first.** Anyone marked `"living": true` in `data/family.js` is automatically hidden.
- **Honest evidence.** Every person carries a status: *confirmed*, *likely*, *unverified*, or
  *family tradition* (explained on `sources.html`).
- **No paywalled content.** This site never copies text, images, trees, or record abstracts from
  Ancestry.com or other paid platforms. Use them only to find leads, then summarise in your own
  words. See `sources.html` and `docs/PROJECT-PLAN.md`.
- **Low friction.** No logins, no database — contributions arrive by email or as downloadable files.

---

## Editing notes

- The site is plain HTML, CSS, and JavaScript. Any text editor works (Notepad, VS Code, etc.).
- The header and footer are defined once in `assets/js/main.js` and injected into every page, so
  you only update navigation in one place.
- No internet connection is required to view the site. Photos you add live in `assets/img/`.

Built as a starting foundation — designed to be handed to the family and grown over time.
