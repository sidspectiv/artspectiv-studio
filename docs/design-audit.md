# Artspectiv Studio landing page audit

**Audit date:** 2026-05-26 (Option C Velvet Lounge + UW-inspired apply)  
**Method:** [ui-ux-pro-max](.cursor/skills/ui-ux-pro-max/SKILL.md) product/style audit, [designing-beautiful-websites](.cursor/skills/designing-beautiful-websites/SKILL.md) harness QA, code + asset verification.  
**Competitor / layout inspiration (section map):** [.cursor/plans/2026-05-26-site-inspiration-brief.plan.md](../.cursor/plans/2026-05-26-site-inspiration-brief.plan.md)  
**Look direction:** Option C Velvet Lounge — [palette-preview.html](palette-preview.html) `#option-c`; UW playbook structural patterns (section panels, stat tiles, callouts, hero blobs)

## Option C Velvet Lounge apply (2026-05-26)

### Tokens and typography (done)

| Item | Value |
|------|-------|
| `--bg` | `#1a0f1e` (deep plum) |
| `--gold` | `#d4a373` (rose gold accent) |
| Display | Cormorant Infant |
| Body / UI | Raleway |
| Kickers / tags / stats | DM Mono (UW-inspired hybrid) |
| `--r` | `24px` |

### UW-inspired components (done)

| Component | Section | Notes |
|-----------|---------|-------|
| Hero decorative blobs | Hero | `::before` / `::after` rose-gold halos |
| Brand pill | Nav | `.brand-pill` — New Barnet |
| Glass stat tiles | Hero (desktop), trust strip | `.stat-tile`, `.trust-pill` glass cards |
| Section panel + gradient head | Offers | `.section-panel`, `.section-head` |
| Section panel soft head | Process | `.section-head-soft` |
| Big-card featured pain | Problem | `.pain-featured` dark gradient panel |
| Callout dark / light | Rita testimonial, trust-note | `.callout.dark`, `.callout.light` |
| Step circles | Process | `.step-card[data-step]` |
| Tag pills | Portfolio groups | `.tag-pill` mono labels |
| Footer strip | Footer | `.footer-strip` mono meta bar |

### Verification (2026-05-26)

| Check | Status |
|-------|--------|
| `npm run deploy:check` | Pass |
| Legacy tokens removed (`#14100c`, `#c8a96a`, Cormorant Garamond, Inter) | Pass |
| Mobile 390px screenshot | `docs/audit-screenshots/velvet-mobile-390.png` |
| Desktop 1280px screenshot | `docs/audit-screenshots/velvet-desktop-1280.png` |
| Pricing / CTA copy unchanged | Pass |
| Page narrative order unchanged | Pass |

### Contrast note (superseded by calm pass)

See **Velvet Calm Audit Fixes** below for current token pairs.

---

## Velvet Calm Audit Fixes (2026-05-26)

**Plan:** `.cursor/plans/velvet_calm_audit_fixes_d61ffd67.plan.md`  
**Goal:** WCAG AA on all reading surfaces, calm premium readability (spacing rhythm, restrained accents). Copy, pricing, page order, and CTA text unchanged.

### Tokens and contrast (done)

| Token | Value | On `--panel` `#2a1828` | On `--bg` `#1a0f1e` |
|-------|-------|------------------------|---------------------|
| `--text` | `#f0e2d8` | AAA | AAA |
| `--text-secondary` | `#c4b5aa` | **8.36:1** AA | **9.32:1** AA |
| `--text-muted` | `#a898ad` | **6.16:1** AA | AA |
| `--muted` | alias → `--text-secondary` | — | — |

Micro-type minimum **0.75rem (12px)** on `.brand-pill`, `.badge-recommended`, `.tag-pill`, `.ph-caption`, `.stat-tile .label`. Glass tiles use solid `--text-secondary` (no `rgba` opacity hacks).

### Typography and accent calm (done)

| Change | Notes |
|--------|-------|
| Display leading | `h1` 1.08, `h2` 1.1, `h3` 1.15 |
| Gold accent scope | Kickers, prices, `.offer-hook`, CTA; pain featured `h3` → `--text`; testimonial attribution → `--text-secondary` |
| Offers section head | Plum panel + 3px gold bottom rule (no full rose-gold gradient) |

### Spacing and layout (done)

8px spacing scale (`--space-1` … `--space-10`) applied to sections, strip, stacks, grids, panels. `.offers-featured` scale transform removed; `box-shadow: var(--glow-soft)` only.

### Visual subtract (done)

| Change | Notes |
|--------|-------|
| `--glow` | Default `none`; soft shadow featured offer only |
| Hero blobs | Opacity ~0.08 |
| Card / panel hover | Border change only; no glow stacking |
| `.hero-chips` | Hidden (single proof strip: mobile stat line, desktop stat tiles) |

### Mobile hero + sticky CTA (done)

| Change | Notes |
|--------|-------|
| Hero height | `min-height: auto` on `.hero-copy` (no 100vh lock) |
| Sticky CTA | Hidden while hero primary CTA or `#contact` in view (mobile); desktop hidden ≥760px |

### Motion (done)

`--motion-slow: 280ms`; reveal `translateY(10px)`; `prefers-reduced-motion` unchanged.

### Verification (2026-05-26)

| Check | Status |
|-------|--------|
| `npm run deploy:check` | Pass |
| Contrast script (secondary/muted on panel + bg) | Pass (≥4.5:1) |
| Mobile 390px screenshot | `docs/audit-screenshots/velvet-calm-mobile-390.png` |
| Desktop 1280px screenshot | `docs/audit-screenshots/velvet-calm-desktop-1280.png` |
| No horizontal scroll 390px | Manual — screenshot pass |
| Single primary CTA in hero viewport (mobile) | Sticky hidden when hero CTA visible |

---

## Symmetrical layout fix (2026-05-26)

**Goal:** Centre contact card and standalone section headers; remove left-only accent borders that read as asymmetrical. Hero editorial layout unchanged.

### Changes (done)

| Area | Fix |
|------|-----|
| `#contact` | Nested `.final-cta` inside `.wrap`; `max-width: 40rem`; top gold rule (not `border-left`); centred kicker, h2, intro, outcome, note |
| Section leads | `.section-lead` on problem, portfolio, terms, FAQ — centred `h2` + lede |
| Callouts | Rita testimonial / trust-note — `border-top: 3px` gold (symmetric) |
| Trust strip | Thumbs centred at all breakpoints |

### Verification (2026-05-26)

| Check | Status |
|-------|--------|
| `npm run deploy:check` | Pass |
| Mobile 390px | `docs/audit-screenshots/align-mobile-390.png` |
| Desktop 1280px (contact) | `docs/audit-screenshots/align-contact-1280.png` |
| Hero editorial (desktop) | Unchanged |

---

## Visual Standout Refresh (2026-05-26)

### Wave A — layout and CSS (done)

| Task | Status | Notes |
|------|--------|-------|
| Hero editorial full-bleed + scrim | Done | Image-first mobile (52vh), `.hero-scrim`, chips, gold stat line |
| Trust strip visual proof | Done | `.trust-visual` thumbnails + outcome verb copy |
| Asymmetric pain section | Done | `.pain-featured` spans 2 cols, gold left border, SVG icon |
| Monthly offer 2+1 layout | Done | `.offers-featured` full-width row, `.offer-hook`, elevated shadow |
| Rita mosaic-first case study | Done | `.case-mosaic` before copy; `.testimonial-featured` prominent |
| Editorial portfolio grid | Done | `.ph-featured` 16:10 hero tiles per group; `.portfolio-lede` |
| Staggered reveal + hero scale | Done | `data-reveal-delay`, `.hero-media.is-loaded` transform |
| Skip link + scroll-margin | Done | `.skip-link`, `section[id]{scroll-margin-top:5rem}`, contact outcome line |

### Wave B — placeholder assets (done)

| Task | Status | Notes |
|------|--------|-------|
| Generate placeholders | Done | `npm run generate:placeholders` — all refs in `index.html` resolve |
| Real photography swap | Pending | Replace gradient JPGs with compressed real work per [image-shot-list.md](image-shot-list.md) before lead outreach |

### Inspiration brief slices (2026-05-26)

| Task | Status | Notes |
|------|--------|-------|
| Brief doc + cross-link | Done | [2026-05-26-site-inspiration-brief.plan.md](../.cursor/plans/2026-05-26-site-inspiration-brief.plan.md) |
| 0 — `.muted` contrast | Pass | `#d4c7b8` on `#14100c` ≈ 8.5:1 (WCAG AA normal text) |
| 1 — Process nav | Done | `#process` section + desktop nav link |
| 2 — Hero subline | Done | Monthly Content Bank default line |
| 10 — Process step numbers | Done | `01` / `02` / `03` kickers |
| 11 — Scope bullet | Done | Paid Meta/TikTok ad management |
| 12 — FAQ posting vs content | Done | New `<details>` entry |
| 13 — `?package=` preselect | Done | `starter` / `monthly` / `campaign` query keys |

Pending from brief (needs assets, deploy, or explicit pick): 4, 6, 7, 8, 14, 15. Task 5 comparison table done in localhost audit pass.

---

## Localhost audit (2026-05-26)

**Method:** Browser MCP at `http://localhost:3000/` (390×844, 1280×800), network tab, [ui-ux-pro-max](.cursor/skills/ui-ux-pro-max/SKILL.md), [designing-beautiful-websites](.cursor/skills/designing-beautiful-websites/SKILL.md), [artspectiv-qa](.cursor/rules/artspectiv-qa.mdc).

### What passes (unchanged)

- Conversion copy, pricing floors, page narrative order, skip link, focus-visible, form labels, Formspree `formAction` in `site-config.json`, reduced-motion, Monthly featured offer.

### Findings and fix status

| ID | Severity | Issue | Status |
|----|----------|-------|--------|
| A1 | P0 | Gradient placeholder JPGs — no real photography | **Pending** — swap `assets/` per [image-shot-list.md](image-shot-list.md) |
| A2 | P0 | Hero photo buried under heavy scrim on mobile | **Fixed** — lighter `.hero-scrim` gradient |
| A3 | P1 | Sticky CTA obscures contact submit on mobile | **Fixed** — `#contact` padding + hide sticky when contact in view |
| A4 | P1 | Packages not scannable in one glance on tablet/desktop | **Fixed** — `.offers-compare` table from 760px |
| A5 | P1 | Portfolio scroll too long (6 groups) | **Fixed** — merged to 4 groups (Service and detail) |
| A6 | P2 | Portfolio/case-study images eager-loaded | **Fixed** — `loading="lazy"` below fold |
| A7 | P2 | Hero missing LCP priority | **Fixed** — `fetchpriority="high"` on hero |
| A8 | P2 | Nav links hidden 760–1023px | **Fixed** — `.links` visible from 760px |
| A9 | P2 | Terms section no deep link | **Fixed** — `id="terms"` |
| A10 | P2 | Process step numbers orphan in SR order | **Fixed** — `aria-hidden` on kickers + `id` on h3 |
| A11 | P3 | Proof stack typo plateddrama / plateddramaaa | **Fixed** — `plateddramaaa` only |
| A12 | P3 | Rita attribution generic | **Pending** — client sign-off |
| A13 | P3 | Formspree live smoke test | **Partial** — `site-config.json` on production returns `formspree.io/f/xpqnodlk` (2026-05-26 deploy `cdd5d03`); browser submit + inbox confirmation still manual |
| A14 | P3 | Google Fonts render-blocking | **Open** — acceptable MVP (F15) |

Screenshots: prior passes in [audit-screenshots/](audit-screenshots/); re-capture after real photo swap.

---

## Findings checklist

### P0 — Visual trust

| ID | Finding | Status |
|----|---------|--------|
| F0 | Assets returned HTML on production | **Fix in repo** — JPGs committed; verify after deploy with `curl -sI …/rita-hero.jpg` |
| F1 | Empty portfolio grids (live) | **Pass (local)** — placeholder JPGs render; swap for real photos |
| F2 | Hero dev placeholder (live) | **Pass (local)** — editorial gradient hero + scrim; real hero JPG present |
| F3 | OG/social preview | **Pass (local)** — `og-cover.jpg` placeholder added |

### P1 — Conversion

| ID | Finding | Status |
|----|---------|--------|
| F4 | Monthly not featured | **Pass** — `.offers-featured` 2+1 layout + Recommended badge + hook |
| F5 | No beauty portfolio | **Pass** — Salons and beauty group with featured tile |
| F6 | Header CTA mismatch | **Pass** — Request a content shoot |
| F7 | Dev note on contact | **Pass** — removed |
| F8 | mailto friction | **Partial** — inline form; set `formAction` in `site-config.json` |
| F21 | Work buried below offers | **Pass** — Rita mosaic + trust thumbnails surface proof earlier |
| F22 | Hero text-first | **Pass** — image-backed hero with scrim on mobile |

### P2 — Polish

| ID | Finding | Status |
|----|---------|--------|
| F9 | sticky-safe unused | **Pass** — on `<body>` |
| F10 | Weak portfolio onerror | **Pass** — `phFallback()` |
| F11 | testimonial-attribution unstyled | **Pass** — gold attribution in `.testimonial-featured` |
| F12 | Voice inconsistency | **Pass** — process uses I |
| F13 | Thin credibility strip | **Pass** — trust pills + visual thumbnails |
| F19 | Empty Rita images (live) | **Pass (local)** — placeholders |
| F20 | Campaign off-screen desktop | **Pass** — 2+1 offers grid shows all three at 1024px |
| F14 | Inline contact style | **Pass** — `.contact-lead` + `.contact-outcome` |
| F15 | Google Fonts external | Open — acceptable MVP |
| F16 | Skip link / aria | **Pass** — skip link to `#main-content` |
| F17 | Tablet package layout | **Pass** — offers stack mobile; 2-col at 1024px |
| F18 | design-audit drift | **Pass** — this update |

### P3

| ID | Finding | Status |
|----|---------|--------|
| F23 | Uniform card monotony | **Pass** — pain featured, mosaic, featured portfolio tiles vary rhythm |

---

## QA harness (post Wave A)

### 1) Outcomes and CTA
- Pass: offer clear in hero; primary CTA Request a content shoot.
- Pass: sticky mobile CTA links to `#contact`.
- Pass: secondary View the work present.
- Pass: hero stat line names deliverable volume (24 images + 4 reels).

### 2) Information hierarchy
- Pass: narrative order unchanged per AGENTS.md.
- Pass: packages before long portfolio.
- Pass: Rita mosaic + testimonial before generic portfolio.

### 3) Offers
- Pass: pricing £445 / £945 / £1,595.
- Pass: Monthly visually featured as recommended core offer (full-width row).

### 4) Trust
- Pass: New Barnet / North London in trust strip, hero chips and FAQ.
- Pass: Rita testimonial featured with gold attribution.

### 5) UX and accessibility
- Pass: focus-visible preserved; reduced-motion respected.
- Pass: skip link present; anchor sections have scroll-margin.
- Pass: image fallbacks on hero and portfolio.
- Pending: re-screenshot production after deploy.
- Pass (local): `refresh-mobile-hero-390.png`, `refresh-desktop-hero-1280.png` in [audit-screenshots/](audit-screenshots/).

### 6) Conversion friction
- Partial: form UI live; Formspree endpoint must be set in `site-config.json`.
- Pass: no dev-only copy in contact section.

---

## Verification commands (2026-05-26)

```bash
grep "hero-scrim" index.html          # present
grep "from £945" index.html           # unchanged pricing
grep "Request a content shoot" index.html
npm run generate:placeholders         # all assets/
npm run deploy:check                  # OK
npm run audit:skills                  # 9 active skills
```

Post-deploy:

```bash
curl -sI https://artspectivstudio.co.uk/assets/rita-hero.jpg
# Expect: Content-Type: image/jpeg
```

Replace placeholder JPGs with compressed real photography before lead outreach.
