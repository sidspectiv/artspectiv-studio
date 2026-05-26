---
name: designing-beautiful-websites
description: Mobile-first landing design for static sites — conversion path, tokens, accessibility, harness QA checklist.
---

# designing-beautiful-websites

Consolidated local skill for Artspectiv Studio static landing pages.

Install references (optional refresh):
- `npx skills add https://github.com/tristanmanchester/agent-skills --skill designing-beautiful-websites`
- `npx skills add https://github.com/anthropics/skills --skill frontend-design`

## Core outcome

Design pages that are beautiful, fast, readable, and conversion-effective on mobile first, while scaling cleanly to desktop.

## Unified method

1. **Define outcomes**: user goal, business goal, success metric, constraints.
2. **Conversion path**: one primary CTA, one secondary CTA, clear trust stack.
3. **Information architecture**: section order that removes objections early (see AGENTS.md page narrative).
4. **Mobile-first layout**: single-column defaults, progressive enhancement at 760px and 1024px.
5. **Visual system**: spacing scale, type scale, contrast, components, interaction states.
6. **Implementation discipline**: semantic HTML, resilient image fallbacks, light JS only.
7. **Validation and handoff**: accessibility checks, performance checks, content QA, next actions.

## Artspectiv-specific tokens (index.html)

- CSS variables: `--bg`, `--gold`, `--max`, motion tokens
- Fonts: Cormorant Garamond (display) + Inter (body) via Google Fonts
- Breakpoints: 760px, 1024px
- Patterns: `.wrap`, `.reveal`, `.btn`, `.card`, `.portfolio-grid`, sticky header, mobile sticky CTA

## Frontend quality rules

- Default to mobile layout first. Expand at explicit breakpoints.
- Keep content width readable (about 45 to 80 characters for body copy).
- Ensure keyboard usability with visible `:focus-visible` styles.
- Keep hover effects optional and not required for comprehension.
- Avoid large dependencies for simple UI behaviour.
- Prefer semantic sections and meaningful heading hierarchy.
- Image `onerror` fallbacks must keep the page coherent when assets are missing.

## Design tokens baseline

- Spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Typography: 12, 14, 16, 18, 20, 24, 32, 40.
- Contrast targets: 4.5:1 normal text, 3:1 large text.

## Harness engineering layer

### A) Prompt harness
- State target audience, conversion goal, and brand tone first.
- Declare non-negotiables (performance, accessibility, static compatibility).
- Include acceptance criteria in checklist form.

### B) Build harness
- Ship in thin slices: structure, copy, style, then polish.
- After each slice run a quick self-audit against this checklist.
- Keep code readable and sectioned for future edits in `index.html`.

### C) QA harness
- Verify on three widths: small mobile, tablet, desktop.
- Verify key path: hero → offers → proof → contact CTA.
- Verify fallback behaviour when images fail.
- Verify focus-visible and readable contrast.
- Cross-check `docs/design-audit.md` before handoff.

## Landing page audit checklist

- Can users explain the offer and next action within 5 to 10 seconds?
- Is the primary CTA visible above the fold on mobile?
- Are packages comparable in under 30 seconds?
- Are trust claims specific, local, and verifiable?
- Does the page remain coherent with missing images?
- Is the code static-host friendly and easy to maintain?

## See also

- `.cursor/rules/artspectiv-frontend.mdc` — scoped frontend pointers
- `.agents/skills/ui-ux-pro-max/SKILL.md` — palette and UX audit CLI (optional)
