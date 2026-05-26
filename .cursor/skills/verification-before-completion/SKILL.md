---
name: verification-before-completion
description: Evidence before claims — run checks and confirm output before marking work done or deploy-ready.
---

# Verification before completion

**Never claim done without evidence.**

## Artspectiv verification checklist

### Site changes (`index.html`)

- [ ] Mobile, tablet, desktop spot-check (hero CTA, packages, contact)
- [ ] `:focus-visible` on interactive elements
- [ ] Image fallbacks behave when assets missing
- [ ] Pricing matches AGENTS constraints (£445 / £945 / £1,595)
- [ ] Page section order matches AGENTS narrative list

### Harness changes

- [ ] `npm run verify:agent-harness` passes
- [ ] Session brief smoke: `'{}' | node .cursor/hooks/session-start.mjs` returns JSON with `additional_context`

### Deploy-ready

- [ ] No secrets committed
- [ ] Cloudflare-compatible (no build step required)
- [ ] `docs/design-audit.md` gaps noted in handoff if any remain

## Evidence format

State what you ran and what happened:

```text
verify:agent-harness → OK
session-start hook → additional_context ~N words
Manual: mobile viewport — primary CTA visible above fold
```

## Do not

- Mark todos complete on assumption
- Skip verification because the change "looks small"

Install upstream: `npx skills add https://github.com/anthropics/skills --skill verification-before-completion`
