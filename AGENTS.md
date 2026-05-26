# Artspectiv Studio — agent memory

> **Status:** Static marketing site (production)  
> **Last Updated:** 2026-05-26 (DL-005 ui-ux-pro-max; DL-004 Velvet Lounge)

---

## Executive summary

**Artspectiv Studio** is a premium local content studio (New Barnet / North London). This repo is a **single-file static site** (`index.html`) deployed to **Cloudflare Pages** — no build step, no framework.

**Conversion goal:** business owners request a content shoot quickly. Primary CTA: **Request a content shoot**.

---

## Governance authority order

When documents disagree:

1. **`PROGRAM.md`** — iteration loop, launch waves, verification discipline
2. **`AGENTS.md`** — institutional memory (this file)
3. **`prompts/codex-brief.md`** — legacy redirect; do not treat as source of truth

---

## Agent harness (rules, hooks, skills, docs)

| Layer | Role | How the agent gets it |
|-------|------|------------------------|
| **Cursor Rules** (`.cursor/rules/*.mdc`) | Thin policy: workflow, static-site guardrails, scoped frontend/QA | Cursor injects from frontmatter |
| **Skills** (`.cursor/skills/`, `.agents/skills/`) | Deep packs (design, deploy, forms, verification) | **Read on demand**; `sessionStart` indexes one-line blurbs only |
| **Hooks** (`.cursor/hooks.json`) | Session brief, secret gates, governance nudges | Cursor runs Node hooks on events |
| **Docs** (`PROGRAM.md`, `CONTEXT.md`, `llms.txt`) | Process + domain language | Read by agent; parts parsed into session brief |

**Read-first entrypoint:** `llms.txt`

**Memory:** file-based only (AGENTS Decision Log + Gotchas). No graph memory in phase 1.

### Hook events

| Event | Script | Purpose |
|-------|--------|---------|
| `sessionStart` | `session-start.mjs` | Token-budgeted session brief from template + AGENTS slices + skill index |
| `preToolUse` | `pre-tool-use.mjs` | Block mutating writes to secret/credential paths |
| `beforeReadFile` | `before-read-file.mjs` | Block reads of secret/credential paths |
| `afterFileEdit` | `after-file-edit.mjs` | stderr nudge when `AGENTS.md`, `PROGRAM.md`, or `index.html` saved |
| `afterAgentResponse` | `after-agent-response.mjs` | stderr nudge for durable learnings + PROGRAM sync |
| `stop` | `stop-learning.mjs` | Append session metadata to continual-learning index |

### Memory promotion pipeline

1. **Capture** — hooks (`afterAgentResponse`, `stop`)
2. **Distil** — human or `agents-memory-updater` subagent
3. **Approve** — `npm run verify:agent-harness`
4. **Promote** — Gotchas → skill → scoped `.mdc` (never duplicate full skill bodies in rules)

---

## Active Constraints and Gotchas

- **Static site only:** Keep `index.html` as primary entry. No framework. Cloudflare Pages compatible (no build command).
- **Pricing guardrails:** Starter from £445, Monthly from £945, Campaign from £1,595. Do not reintroduce legacy £225/£695/£1,095 unless explicitly requested.
- **Page narrative order:** Hero → credibility → problem → offers → Rita's case study → portfolio → process → terms → FAQ → final CTA.
- **Images:** All photos under `assets/`. Use strongest 20–30 images only. Match filenames in `docs/image-shot-list.md`.
- **CTA flow:** Primary CTA is hosted enquiry form on `#contact` via Formspree (`assets/site-config.json` → `formAction`). No public email in contact UI.
- **Brand tone:** Velvet Lounge — dark plum editorial, rose-gold accent, calm premium readability; plain English. Explore look/feel in `docs/palette-preview.html` before token changes to `index.html`.
- **Design tokens (live):** `--bg` `#1a0f1e`, `--gold` `#d4a373`; Cormorant Infant + Raleway + DM Mono. Do not revert to legacy warm brown (`#14100c` / `#c8a96a`) or Inter/Cormorant Garamond unless explicitly requested.
- **Commercial model:** Productised monthly retainers; first GTM goal is two strong Monthly (Growth) clients, not six — see `docs/commercial-strategy.md`.
- **Proof before outreach:** Rita written testimonial before heavy lead outreach.
- **Lead data freshness:** Verify IG followers, review counts, and awards before quoting in pitches — strategy doc data goes stale.

---

## Gotchas

- **Legacy pricing:** Old packages (£225/£695/£1,095) must not return in copy unless the user explicitly asks.
- **Image shot list drift:** `docs/image-shot-list.md` must stay aligned with `index.html` `assets/` references — verify with Grep after portfolio edits.
- **Formspree domain allowlist:** If submissions fail on live site, add `artspectivstudio.co.uk` (and Pages preview host) in Formspree form settings.
- **Unverified lead metrics:** Do not quote unverified IG stats or awards (e.g. Posh 2026 award) in copy or outreach drafts.
- **Legacy design tokens:** Warm brown + muted gold palette and Inter body font were replaced 2026-05-26 — grep `index.html` before “restoring” older styles.
- **Palette preview vs live site:** `docs/palette-preview.html` is a sandbox only; applying a direction requires an explicit user choice and `index.html` token pass.
- **ui-ux-pro-max on Windows:** `npx skills add` may install broken relative paths for `data/` and `scripts/` — canonical full pack is `.cursor/skills/ui-ux-pro-max/` (verify with `npm run audit:skills`).

---

## Decision Log

### DL-001: Adopt Cursor agent harness (2026-05-26)
**Area:** infra  
**Context:** Repo had harness concepts in `prompts/codex-brief.md` and a local design skill but no Cursor rules, hooks, or institutional memory.  
**Decision:** Port Project Roast layer model (rules, hooks, skills, AGENTS) right-sized for a static single-file site — file-based memory only, no graph stack.  
**Outcome:** Worked  
**Lesson:** Thin `.mdc` rules + on-demand skills + token-budgeted session brief beats pasting full skill bodies into always-on context.

### DL-002: Reconcile image shot list with index.html (2026-05-26)
**Area:** frontend  
**Context:** `docs/image-shot-list.md` listed filenames not referenced in `index.html` (e.g. `food-01.jpg`) and missed files the page uses (e.g. `rita-04`, `portfolio-detail-01`).  
**Decision:** Update shot list to match live `index.html` references plus meta assets (`og-cover`, favicons).  
**Outcome:** Worked  
**Lesson:** Treat `index.html` as canonical for asset filenames; shot list is documentation for photographers, not the other way around.

### DL-003: Adopt commercial strategy in harness (2026-05-26)
**Area:** infra  
**Context:** New Barnet lead report defined GTM, lead priority, and outreach ops but lived outside the repo.  
**Decision:** Vendor as `docs/commercial-strategy.md`; distill into `CONTEXT.md`, `PROGRAM.md` GTM phases, session brief, and `artspectiv-commercial` skill.  
**Outcome:** Worked  
**Lesson:** Keep full lead scripts in deep doc; session brief gets pillars only — agents Read on demand for sell-sheets.

### DL-004: Velvet Lounge visual system on live site (2026-05-26)
**Area:** UX  
**Context:** Site read as generic dark landing; user wanted standout look/feel. `docs/palette-preview.html` Option C (Velvet Lounge) chosen after creative direction review.  
**Decision:** Apply plum/rose-gold tokens, Cormorant Infant + Raleway + DM Mono, UW-inspired panels/callouts/steps in `index.html`; follow with calm pass (surface text tokens, spacing scale, restrained accents).  
**Outcome:** Worked  
**Lesson:** Preview file de-risks palette bets; a second pass for WCAG AA and accent fatigue is required before calling design deploy-ready.

### DL-005: Vendor full ui-ux-pro-max skill pack (2026-05-26)
**Area:** infra  
**Context:** User requested install from `skills-lock.json`; global `npx skills add` left pointer stubs with broken `../../../src/...` paths on Windows.  
**Decision:** Canonical copy under `.cursor/skills/ui-ux-pro-max/` with real `data/` and `scripts/` from upstream; Artspectiv appendix in `SKILL.md`.  
**Outcome:** Worked  
**Lesson:** Always verify with `npm run audit:skills` after install — do not assume npx dropped a complete pack.

---

## Current Direction

- Get Rita written testimonial; pick two first-wave leads (one café + one beauty/salon).
- Deploy and smoke-test Formspree on live `#contact` after push (endpoint `xpqnodlk` in `assets/site-config.json`).
- Upload real compressed images to `assets/` using names in `docs/image-shot-list.md` (placeholders in place; Wave B in `docs/design-audit.md`).
- Finish symmetrical layout pass if needed: `#contact` wrap/card split, `#faq` `.section-lead` — partial CSS/HTML already in `index.html`.
- Recolour `assets/og-cover.jpg` for plum palette when preparing lead outreach.
- Connect custom domain `artspectivstudio.co.uk` when portfolio is lead-ready.

---

## Canonical paths

| Path | Role |
|------|------|
| `index.html` | Entire site (HTML + CSS + JS) |
| `assets/` | Portfolio images, favicons, OG image |
| `docs/design-audit.md` | QA record against design skill |
| `docs/palette-preview.html` | Look/feel sandbox (not deployed) |
| `.cursor/plans/2026-05-26-site-inspiration-brief.plan.md` | Competitor inspiration + section map |
| `docs/deployment-notes.md` | Cloudflare Pages workflow |
| `docs/image-shot-list.md` | Required asset filenames |
| `docs/commercial-strategy.md` | Commercial intent, lead priority, outreach ops |
| `CONTEXT.md` | Distilled domain + strategy language |
| `.cursor/rules/artspectiv-agent-workflow.mdc` | Skill trigger matrix + context engineering |

---

## Rule lineage routing

| Learning type | Primary rule |
|---------------|--------------|
| Workflow, context, skills | `artspectiv-agent-workflow.mdc` |
| Cross-cutting trust, git, static site | `artspectiv-global.mdc` |
| `index.html` layout, CSS, motion, images | `artspectiv-frontend.mdc` |
| QA, handoff, design audit | `artspectiv-qa.mdc` |

Full procedure: `.cursor/skills/artspectiv-memory/SKILL.md`
