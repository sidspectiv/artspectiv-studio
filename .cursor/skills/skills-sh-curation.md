# Skills curation — Artspectiv Studio

## Tier 1 (always relevant for this repo)

| Skill | Location | Notes |
|-------|----------|-------|
| designing-beautiful-websites | `.cursor/skills/` | Static landing design + QA harness |
| verification-before-completion | `.cursor/skills/` | Evidence before done |
| ui-ux-pro-max | `.cursor/skills/` | Full pack (data + scripts); palette, a11y, UX audit |

## Tier 2 (task-specific)

| Skill | Location | Notes |
|-------|----------|-------|
| artspectiv-deploy | `.cursor/skills/` | Cloudflare Pages |
| artspectiv-forms | `.cursor/skills/` | Tally/Formspree |
| artspectiv-memory | `.cursor/skills/` | AGENTS.md protocol |
| artspectiv-skill-install | `.cursor/skills/` | Vendor external skills |
| writing-plans | `.cursor/skills/` | Multi-section changes |

## Tier 3 (discovery)

- User-level **find-skills** when no vendored pack fits

## Install commands

```bash
npx skills add https://github.com/anthropics/skills --skill verification-before-completion
npx skills add https://github.com/anthropics/skills --skill writing-plans
npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max
```

After install, copy matrix-referenced skills from `.agents/skills/` to `.cursor/skills/` per `artspectiv-skill-install`.

## Installed in repo (canonical)

- designing-beautiful-websites
- artspectiv-deploy
- artspectiv-forms
- artspectiv-memory
- artspectiv-skill-install
- writing-plans
- verification-before-completion
- ui-ux-pro-max (full — 2026-05-26 via skills-lock.json)
