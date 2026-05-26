---
name: artspectiv-skill-install
description: Install skills from skills.sh or GitHub — vendor to .cursor/skills, thin MDC pointers only.
---

# Artspectiv — install a skill

Use when the task is to **add / install / vendor** a capability from **skills.sh** or **GitHub**.

## Dual-root reality

| Tree | Purpose | MDC canonical? |
|------|---------|----------------|
| `.cursor/skills/` | Authoritative packs for MDC + trigger matrix | **Yes** |
| `.agents/skills/` | `npx skills add` default | No — session-start indexes both |

After `npx skills add`, **copy** design-relevant packs into `.cursor/skills/` when they appear in the trigger matrix.

## Default drop location

1. **Canonical home:** `.cursor/skills/<skill-folder>/`
2. Preserve upstream layout: `SKILL.md` plus `references/`, `scripts/` if present.
3. **Folder name:** lowercase, hyphens; match upstream id.

## Install mechanics

- **Registry:** `npx skills add <source> --skill <id> -y -g -a cursor` then copy to `.cursor/skills/<id>/` if matrix-referenced.
- **Raw GitHub:** shallow clone, copy skill subtree, delete temp dir.

## Value review

1. **Overlap:** Grep existing `.cursor/skills/*/SKILL.md` descriptions.
2. **Surface:** Which code does it touch — `index.html`, docs, hooks?
3. **Keep vs merge:** separate folders unless clearly duplicate topic.

## Consolidation

- **MDC:** At most one or two lines in scoped rule — `Deep dive: .cursor/skills/<id>/SKILL.md`
- **`skills-sh-curation.md`:** Append install row.
- **AGENTS.md:** Decision Log only for non-obvious install lessons.

## Verification

- `npm run audit:skills`
- `{}` | `node .cursor/hooks/session-start.mjs` — brief lists new skill blurb
- No secrets in copied files
