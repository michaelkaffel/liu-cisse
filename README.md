# Liu-Cissé Holdings, Inc. — Website

Marketing and presence site for Liu-Cissé Holdings, Inc., a healthcare AI governance and systems strategy firm. Built as a static single-page site and deployed on Vercel.

**Live:** [liu-cisse.vercel.app](https://liu-cisse.vercel.app) *(update when custom domain is confirmed)*

---

## Stack

- Vanilla HTML / CSS / JS — no framework, no build step
- Fonts: Cormorant Garamond (serif) + Libre Franklin (sans) via Google Fonts
- Deployed as static site on Vercel via GitHub

---

## File Structure

```
liu-cisse/
├── index.html
├── styles.css
├── main.js
└── assets/
    ├── founder.png               # Quote block photo
    ├── liucisse_logo.png         # Used in nav + footer
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png
    ├── android-chrome-192x192.png
    ├── android-chrome-512x512.png
    └── site.webmanifest
```

---

## Sections (in order)

| # | Section | Background | Notes |
|---|---------|------------|-------|
| 1 | Hero | Ivory | Animated gold cursor replaces headline period |
| 2 | Values Bar | Deep forest `#0b1f1c` | 4 service pillars with SVG icons |
| 3 | The Work | Charcoal | Two-column sticky-left layout |
| 4 | Global Map | Navy | Inline SVG world map, 4 location nodes |
| 5 | Founder | Ivory | Bio, credentials, LinkedIn links |
| 6 | Quote Block | Deep forest `#0b1f1c` | Founder photo left, blockquote right |
| 7 | CTA | Charcoal | Calendly link |
| 8 | Footer | Ivory | Privacy + Terms modals |

**Removed sections (code retained, commented out):** How We Work / Services cards, Affiliations, Newsletter signups.

---

## Color Palette

| Token | Hex | Used for |
|-------|-----|----------|
| `--ivory` | `#f5f0e8` | Hero, Founder, Nav, Footer backgrounds |
| `--charcoal` | `#141414` | The Work, CTA backgrounds; body text on light sections |
| `--navy` | `#12151f` | Global Map background |
| `--forest` (deep) | `#0b1f1c` | Values Bar, Quote Block backgrounds |
| `--gold` | `#c9a84c` | Primary accent — icons, labels, CTAs |
| `--gold-dim` | `#a8893a` | Secondary accent — eyebrows, links on light bg |
| `--copper` | `#b5703a` | Hero eyebrow, Founder title + links |

---

## Local Development

No build tooling required. Open directly in a browser or run a local server:

```bash
# Python
python3 -m http.server 5500

# Node
npx serve .
```

---

## Deployment

Deployed automatically via Vercel on push to `main`. No build command or output directory configuration needed — Vercel serves `index.html` as the root.

---

## Outstanding To-Dos

- [ ] **Newsletter forms** — section is currently commented out. When reinstating, wire to Resend via Vercel serverless function at `/api/subscribe`. Stub is in `main.js`.
- [ ] **Custom domain** — update OG/Twitter `og:url` and `og:image` URLs in `<head>` once confirmed.
- [ ] **`robots.txt`** — add before launch.
- [ ] **Mobile drawer cleanup** — drawer still contains stale links (`#services`, `#affiliations`, `#global`) for sections that have been removed; trim to match live nav.
- [ ] **Dead CSS** — `styles.css` retains rules for `.services`, `.affiliations`, `.newsletter` which are no longer rendered; safe to prune once sections are confirmed permanently removed.

---

## Design Reference

Inspired by [owlchrysalismedicine.com](https://owlchrysalismedicine.com) — dark alternating section colors, editorial serif headlines, gold accents.