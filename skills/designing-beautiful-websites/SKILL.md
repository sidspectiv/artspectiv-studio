# designing-beautiful-websites

Consolidated local skill combining:
- `designing-beautiful-websites` from `tristanmanchester/agent-skills`
- `frontend-design` from `anthropics/skills`

Install references:
- `npx skills add https://github.com/tristanmanchester/agent-skills --skill designing-beautiful-websites`
- `npx skills add https://github.com/anthropics/skills --skill frontend-design`

## Environment note
Direct fetch of both source repositories was blocked in this environment (HTTP 403), so this file is a merged local implementation aligned to the requested skill intent.

## Core outcome
Design pages that are beautiful, fast, readable, and conversion-effective on mobile first, while scaling cleanly to desktop.

## Unified method (strategy + frontend design)
1. **Define outcomes**: user goal, business goal, success metric, constraints.
2. **Conversion path**: one primary CTA, one secondary CTA, clear trust stack.
3. **Information architecture**: section order that removes objections early.
4. **Mobile-first layout**: single-column defaults, progressive enhancement breakpoints.
5. **Visual system**: spacing scale, type scale, contrast, components, interaction states.
6. **Implementation discipline**: semantic HTML, resilient image fallbacks, light JS only.
7. **Validation and handoff**: accessibility checks, performance checks, content QA, next actions.

## Frontend quality rules
- Default to mobile layout first. Expand at explicit breakpoints.
- Keep content width readable (about 45 to 80 characters for body copy).
- Ensure keyboard usability with visible focus styles.
- Keep hover effects optional and not required for comprehension.
- Avoid large dependencies for simple UI behaviour.
- Prefer semantic sections and meaningful heading hierarchy.

## Design tokens baseline
- Spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Typography: 12, 14, 16, 18, 20, 24, 32, 40.
- Contrast targets: 4.5:1 normal text, 3:1 large text.
- Elevation levels: 3 to 5 with clear intent.

## Harness engineering layer
Use a repeatable implementation harness so changes remain consistent:

### A) Prompt harness
- State target audience, conversion goal, and brand tone first.
- Declare non-negotiables (performance, accessibility, static compatibility).
- Include acceptance criteria in checklist form.

### B) Build harness
- Ship in thin slices: structure, copy, style, then polish.
- After each slice run a quick self-audit against this skill checklist.
- Keep code readable and sectioned for future edits.

### C) QA harness
- Verify on three widths: small mobile, tablet, desktop.
- Verify key path: hero -> offers -> proof -> contact CTA.
- Verify fallback behaviour when images fail.
- Verify focus-visible and readable contrast.

## Landing page audit checklist
- Can users explain the offer and next action within 5 to 10 seconds?
- Is the primary CTA visible above the fold on mobile?
- Are packages comparable in under 30 seconds?
- Are trust claims specific, local, and verifiable?
- Does the page remain coherent with missing images?
- Is the code static-host friendly and easy to maintain?
