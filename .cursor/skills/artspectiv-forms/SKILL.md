---
name: artspectiv-forms
description: Replace mailto CTA with Tally or Formspree — hosted form integration for Artspectiv contact section.
---

# Artspectiv — form CTA integration

**Current state:** `#contact` posts to Formspree via `assets/site-config.json` (`formAction`). Vanilla JS `fetch` + `Accept: application/json`.  
**Endpoint:** `https://formspree.io/f/xpqnodlk` — notifications in Formspree dashboard (not in repo).

## Requirements

- Keep primary CTA copy: **Request a content shoot**
- Collect: business name, Instagram handle, package interest, content-only vs posting support
- Preserve mobile sticky CTA linking to `#contact`
- Static-site compatible (no backend in this repo)

## Option A — Tally

1. Create form on [tally.so](https://tally.so) with fields above.
2. Get embed URL or direct link.
3. Replace `mailto` href on primary buttons with Tally URL (or embed iframe in `#contact` if acceptable for layout).
4. Update `contact-note` copy to remove mailto placeholder text.
5. Test on mobile: sticky CTA, keyboard focus, form submit.

## Option B — Formspree

1. Form at [formspree.io](https://formspree.io) — endpoint in `assets/site-config.json`.
2. Add `<form action="https://formspree.io/f/..." method="POST">` in `#contact` with accessible labels.
3. Style form to match dark editorial tokens (`--bg`, `--gold`, `.btn`).
4. Handle success/error states with minimal vanilla JS if needed.
5. Test submission end-to-end.

## Acceptance checks

- [ ] Primary CTA no longer opens mail client by default
- [ ] Form works on mobile without horizontal scroll
- [ ] Focus states visible on all fields
- [ ] `docs/design-audit.md` §6 updated to Pass
- [ ] Decision Log entry in AGENTS.md if non-obvious integration choice

## Do not

- Add a framework or build step for forms only
- Commit API keys or form secrets (use public form endpoints only)
