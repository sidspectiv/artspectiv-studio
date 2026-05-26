# Artspectiv Studio — agent operating program

Human-editable steering for launch waves (Karpathy `program.md` style, adapted for a static marketing site).

**Last refined:** 2026-05-26 (Formspree wired — `xpqnodlk`, mailto removed from contact)

## Keep this file aligned (agents + hooks)

- **`PROGRAM.md` is the human steering surface** for waves and launch remainder — not a duplicate of `AGENTS.md`, but must stay consistent when priorities change.
- **Cursor hooks** (stderr only): editing `AGENTS.md`, `PROGRAM.md`, or `index.html` triggers reminders; assistant replies with wave/roadmap language trigger `afterAgentResponse`. Hooks cannot write this file — apply updates in the same session.
- **Rule:** `.cursor/rules/artspectiv-agent-workflow.mdc` § PROGRAM.md sync

## Authority stack

1. **`PROGRAM.md`** — iteration method and wave status
2. **`AGENTS.md`** — institutional memory
3. **`prompts/codex-brief.md`** — legacy redirect only

## In scope

- Single-file site: `index.html`
- Assets: `assets/`
- Docs: `docs/`
- Deploy: Cloudflare Pages (no build step)

## Success metrics (per iteration)

1. **Mobile CTA:** Primary CTA visible without excessive scroll on small viewports.
2. **Offer clarity:** Packages scannable in under 30 seconds.
3. **Deploy:** Push to `main` auto-deploys on Cloudflare Pages without build errors.
4. **QA:** Run checklist in `.cursor/rules/artspectiv-qa.mdc` before claiming done.

## Loop

1. Read `AGENTS.md` (Current Direction, Gotchas, latest Decision Log).
2. **One slice** per iteration (e.g. one section of `index.html`, or one doc update), then verify.
3. Durable learnings → append Decision Log in `AGENTS.md`; run rule lineage (`artspectiv-memory` skill).
4. Run `npm run verify:agent-harness` after harness or AGENTS structural changes.

## Launch wave status

| Wave | Focus | Status |
|------|-------|--------|
| 1 | Cursor harness (rules, hooks, skills, AGENTS) | completed |
| 2 | Form CTA (Formspree on `#contact`) | completed |
| 3 | Real asset upload + compression | in progress |
| 4 | Custom domain on Cloudflare | pending |

## Commercial GTM phases

Separate from site launch waves — human steering for client acquisition.

| Phase | Window | Goal |
|-------|--------|------|
| 1 | Days 1–45 | Rita written testimonial + 2 client wins (1 hospitality, 1 beauty/salon) |
| 2 | After first testimonial | Local reference pitching in Barnet network |
| 3 | Months 3–4 | +2 Growth (Monthly) clients only if delivery is under control |

**Phase 1 detail:** See `CONTEXT.md` (first-wave pair) and `docs/commercial-strategy.md` (sell-sheets, scripts). **Site Wave 2** (hosted form on `#contact`) supports Phase 1 conversion infra.

## Public launch remainder

- Deploy Formspree config (`assets/site-config.json`) and confirm test submission on live domain
- Portfolio images replaced (not placeholders)
- `docs/design-audit.md` passes with no high-impact gaps
- Custom domain connected when ready to share with leads

## Fixed constraints

- No secrets in repo; hooks block sensitive paths.
- No framework or build step unless explicitly approved.
- Pricing and page narrative order per `AGENTS.md` Active Constraints.
