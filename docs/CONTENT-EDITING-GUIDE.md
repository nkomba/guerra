# Editing Guide — for the family (no coding needed)

This guide is written for relatives who are **not** programmers. If you can edit a recipe in a text
document, you can maintain this website. Take it slowly, change one thing at a time, and keep a
backup copy of the folder before big edits.

> **Golden rule:** before editing, copy the whole `Guerra` folder somewhere safe. If anything breaks,
> you can always go back.

---

## The tools you need

- Any plain-text editor. **Notepad** (Windows) works. **Visual Studio Code** (free) is nicer because
  it colours the text and warns you about mistakes.
- A web browser (Chrome, Edge, Firefox…) to open `index.html` and check your changes.

To see a change: save the file, then **refresh** the page in your browser (press `F5`).

---

## 1. Add a relative to the family tree

All the people live in **`data/family.js`**. Open it in your text editor.

Scroll to the `people:` section. Each person is a block that looks like this:

```js
{
  id: "p6", name: "José Guerra", sex: "M", gen: 3, branch: "casa-do-alto",
  living: false, status: "confirmed",
  birth: { date: "1876", place: "Freixo da Serra, Gouveia, Portugal" },
  death: { date: "1954", place: "Gouveia, Portugal" },
  parents: ["p3", "p5"], spouses: ["p11"], children: ["p12", "p13"],
  notes: "Continued the Casa do Alto line...",
  sources: ["Baptism register, Freixo da Serra parish, 1876"]
},
```

**To add a new person:**

1. Copy one whole block, from the `{` to the `},` (include the comma!).
2. Paste it just below, still inside the `people: [ ... ]` list.
3. Change the values. Here's what each part means:

| Field | What to put | Example |
|---|---|---|
| `id` | A unique code no one else uses | `"p16"` |
| `name` | Full name | `"Maria Guerra"` |
| `sex` | `"M"`, `"F"`, or `"?"` | `"F"` |
| `gen` | Generation number (1 = earliest) | `3` |
| `branch` | A branch id from the top of the file | `"casa-do-alto"` |
| `living` | `true` if they may be alive, else `false` | `false` |
| `status` | `"confirmed"`, `"likely"`, `"unverified"`, or `"tradition"` | `"likely"` |
| `birth` / `death` | A `date` and a `place` (any blanks are fine) | `{ date: "1901", place: "Gouveia" }` |
| `parents` | The `id`s of their parents | `["p3","p5"]` |
| `spouses` | The `id`s of husband/wife | `["p11"]` |
| `children` | The `id`s of their children | `["p12","p13"]` |
| `notes` | Anything you want to say | `"Emigrated to Brazil."` |
| `sources` | A list of where the facts come from | `["1901 baptism register"]` |

4. **Link the relatives both ways.** If you say the new person's `parents` are `["p3"]`, also open
   person `p3` and add the new person's `id` to their `children` list. The tree reads both.
5. Save the file and refresh `family-tree.html`.

**Blank template to copy:**

```js
{
  id: "pNEW", name: "", sex: "?", gen: 1, branch: "casa-do-alto",
  living: false, status: "unverified",
  birth: { date: "", place: "" },
  death: { date: "", place: "" },
  parents: [], spouses: [], children: [],
  notes: "",
  sources: []
},
```

> **Careful with punctuation.** Keep the quotation marks `"..."` around words. Keep a comma `,` after
> each person's closing `}`. If the tree page goes blank after an edit, you probably removed a quote
> or a comma — undo your last change and try again.

---

## 2. Protect a living person

Set `living: true`. The site then hides that person's dates, places, and notes automatically and
shows only a "Living – protected" placeholder. **Never** publish a living person's details without
their permission (see `privacy.html`).

---

## 3. Add, rename, or edit a branch

At the top of `data/family.js` is the `branches:` list. Each branch looks like:

```js
{
  id: "casa-do-alto",
  name: "Casa do Alto (Main Paternal Line)",
  lead: "The senior Guerra line traced continuously in Freixo da Serra.",
  description: "...",
  keyAncestors: "João Guerra & Maria dos Santos → Manuel Guerra & Rosa Nunes",
  migration: "..."
},
```

Copy a block to add a branch, or edit the text to change one. The `id` is the short code you type
into a person's `branch` field, so keep it simple and lowercase with hyphens (e.g. `"lisbon-line"`).

---

## 4. Set the curator's email address

Open **`assets/js/forms.js`**. Near the very top you'll see:

```js
var CURATOR_EMAIL = "curator@guerraclan.org"; // ← change to your real address
```

Change the address inside the quotes to the real family curator's email. Save. Every contribution
form and every "email the curator" link across the site now uses it.

---

## 5. Edit the words on any page

Open the `.html` file for that page (for example `about.html`) in your text editor. The words you see
on the website sit between tags like `<p> ... </p>` (a paragraph) or `<h2> ... </h2>` (a heading).
Type over the existing words. Don't remove the `< >` tags themselves. Save and refresh.

If you want a special character like `&`, write `&amp;` (that's just how web pages spell it).

---

## 6. Change the navigation menu

The top menu and the footer are defined **once** in `assets/js/main.js` (look for the `NAV` list near
the top). Edit a label or reorder items there and every page updates. You normally won't need to touch
this.

---

## 7. Add a photo

1. Put the image file into the `assets/img/` folder (e.g. `assets/img/wedding-1920.jpg`).
2. In the page where you want it, add an image tag, for example:
   `<img src="assets/img/wedding-1920.jpg" alt="Guerra family wedding, about 1920">`
3. Always write a short `alt` description — it helps people using screen readers and shows if the
   image can't load.
4. Only add photos you have the right to share (see `privacy.html`).

---

## 8. Handling contributions (for the curator)

Contributions arrive in your email inbox (or as files people send you). A simple routine:

1. Read it; ask a follow-up question if needed.
2. Decide the evidence label: confirmed, likely, unverified, or family tradition.
3. Check privacy — nothing about a living person without consent.
4. Add it: a person/branch goes into `data/family.js`; a story goes into `stories.html`.
5. Thank the contributor and credit them the way they asked.
6. Keep a simple list of what you've received and where it went.

See `docs/PROJECT-PLAN.md` → *Contribution & moderation workflow* for the fuller version.

---

## 9. Put the site online (optional)

The site is just files, so any static web host works. Easy free options include **Netlify**,
**GitHub Pages**, and **Cloudflare Pages** — you upload the `Guerra` folder and they give you a web
address. You don't need a database or any server software. If you later want form submissions to land
in a dashboard instead of email, a service like **Formspree** or **Netlify Forms** can be wired into
`assets/js/forms.js`.

---

## If something breaks

- **A page looks unstyled (plain text).** The stylesheet didn't load — make sure the `assets` folder
  is still next to the HTML files and nothing was renamed.
- **The family tree is blank.** There's likely a typo in `data/family.js` (a missing quote or comma).
  Undo your last edit. In VS Code, red underlines point to the problem.
- **A form doesn't open email.** Some computers have no email app set up. Use the **Download as a
  file** button instead and email the file the normal way.
- **Still stuck?** Restore your backup copy of the folder and try the edit again, one small step at a
  time.

You've got this. Small, careful edits — and keep that backup.
