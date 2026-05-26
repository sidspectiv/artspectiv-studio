# Artspectiv Studio landing page audit

**Audit date:** 2026-05-26 (live browser review + remediation pass)  
**Method:** [designing-beautiful-websites](.cursor/skills/designing-beautiful-websites/SKILL.md), live screenshots in [docs/audit-screenshots/](audit-screenshots/), post-fix code review.

## Live baseline (pre-fix)

Browser review at https://artspectivstudio.co.uk/ (390px / 1280px) found: missing `/assets/*` files served as HTML, empty portfolio grids, dev mailto note visible, header CTA mismatch. See plan `landing_page_aesthetic_audit_65ed6df4.plan.md`.

## Remediation status (2026-05-26)

| Slice | Status | Notes |
|-------|--------|-------|
| 0 — Asset deploy routing | Done in repo | `_redirects` (no SPA catch-all); placeholder JPGs committed; **redeploy required** for production |
| 1 — Visual credibility | Partial | Placeholder gradients in `assets/`; replace with real photos per [image-shot-list.md](image-shot-list.md); beauty group added |
| 2 — Conversion hierarchy | Done | Monthly featured, header CTA unified, `sticky-safe`, dev note removed |
| 3 — Credibility polish | Done | Trust strip, testimonial attribution CSS, voice harmonised (I) |
| 4 — Hosted form | Partial | Formspree form in `#contact`; set `assets/site-config.json` → `formAction` |
| 5 — Audit doc | Done | This file |

---

## Findings checklist

### P0 — Visual trust

| ID | Finding | Status |
|----|---------|--------|
| F0 | Assets returned HTML on production | **Fix in repo** — JPGs in `assets/`; verify after deploy with `curl -sI …/rita-hero.jpg` |
| F1 | Empty portfolio grids (live) | **Fix in repo** — placeholders; swap for real work |
| F2 | Hero dev placeholder (live) | **Fix in repo** — softer fallback copy; real hero JPG present |
| F3 | OG/social preview | **Fix in repo** — `og-cover.jpg` placeholder added |

### P1 — Conversion

| ID | Finding | Status |
|----|---------|--------|
| F4 | Monthly not featured | **Pass** — `.service.featured` + Recommended badge |
| F5 | No beauty portfolio | **Pass** — Salons and beauty group added |
| F6 | Header CTA mismatch | **Pass** — Request a content shoot |
| F7 | Dev note on contact | **Pass** — removed |
| F8 | mailto friction | **Partial** — inline form; mailto as secondary link until `formAction` set |

### P2 — Polish

| ID | Finding | Status |
|----|---------|--------|
| F9 | sticky-safe unused | **Pass** — on `<body>` |
| F10 | Weak portfolio onerror | **Pass** — `phFallback()` |
| F11 | testimonial-attribution unstyled | **Pass** |
| F12 | Voice inconsistency | **Pass** — process uses I |
| F13 | Thin credibility strip | **Pass** — trust pills |
| F19 | Empty Rita images (live) | **Fix in repo** — placeholders |
| F20 | Campaign off-screen desktop | Open — layout unchanged; three cards at 1024px |
| F14 | Inline contact style | **Pass** — `.contact-lead` class |
| F15 | Google Fonts external | Open — acceptable MVP |

### P3

| ID | Finding | Status |
|----|---------|--------|
| F16 | Skip link / aria | Open |
| F17 | Tablet package layout | Open |
| F18 | design-audit drift | **Pass** — this update |

---

## QA harness (post-fix)

### 1) Outcomes and CTA
- Pass: offer clear in hero; primary CTA Request a content shoot.
- Pass: sticky mobile CTA links to `#contact`.
- Pass: secondary View the work present.

### 2) Information hierarchy
- Pass: narrative order unchanged per AGENTS.md.
- Pass: packages before long portfolio.
- Pass: Rita before generic portfolio.

### 3) Offers
- Pass: pricing £445 / £945 / £1,595.
- Pass: Monthly visually featured as recommended core offer.

### 4) Trust
- Pass: New Barnet / North London in trust strip and FAQ.
- Pass: Rita testimonial with attribution styling.

### 5) UX and accessibility
- Pass: focus-visible preserved; reduced-motion respected.
- Pass: image fallbacks on hero and portfolio.
- Pending: re-screenshot production after deploy.

### 6) Conversion friction
- Partial: form UI live; Formspree endpoint must be set in `site-config.json`.
- Pass: no dev-only copy in contact section.

---

## Post-deploy verification

```bash
curl -sI https://artspectivstudio.co.uk/assets/rita-hero.jpg
# Expect: Content-Type: image/jpeg

grep -i "Mailto is live" index.html
# Expect: no matches
```

Replace placeholder JPGs with compressed real photography before lead outreach.
