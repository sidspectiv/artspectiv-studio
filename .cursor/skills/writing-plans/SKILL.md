---
name: writing-plans
description: Write implementation plans before multi-section site changes — bite-sized tasks with verification steps.
---

# Writing plans

Use before **multi-section** changes to `index.html` or harness files (3+ logical sections touched).

## When to plan

- Restructuring page narrative order
- Large copy + CSS refactors together
- Form integration + CTA updates across header, contact, sticky bar
- Harness additions touching rules, hooks, and AGENTS together

## Plan location

- Primary: `.cursor/plans/<descriptive-name>.plan.md`
- Reference PROGRAM.md wave and AGENTS.md Current Direction

## Plan structure

1. **Goal** — one sentence, user-visible outcome
2. **Constraints** — cite AGENTS Active Constraints (pricing, static-only, page order)
3. **Tasks** — numbered, each independently verifiable
4. **Verification** — mobile QA, `verify:agent-harness` if harness touched
5. **Handoff** — what remains, what to update in AGENTS/PROGRAM

## Artspectiv slice discipline

Prefer thin slices aligned to harness:

1. Structure / section order
2. Copy and offers
3. Style and tokens
4. Accessibility and polish

Do not stack unverified slices — verify each before the next.

## See also

- `.cursor/rules/artspectiv-agent-workflow.mdc`
- `.cursor/skills/verification-before-completion/SKILL.md`

Install upstream: `npx skills add https://github.com/anthropics/skills --skill writing-plans`
