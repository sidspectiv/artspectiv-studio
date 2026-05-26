# Artspectiv Studio

Premium photo and reel content for cafés, bars, salons and local brands across North London.

## What this is

Static website for **Artspectiv Studio** — productised photo, reel and monthly content-bank services.

- `index.html` — entire site (HTML, CSS, JS)
- `assets/` — portfolio images and meta assets
- `docs/` — deployment, design audit, image shot list
- `llms.txt` — **agent read-first index**
- `AGENTS.md` — institutional memory and harness architecture

## Stack

- HTML, CSS, vanilla JavaScript
- Cloudflare Pages (no build step)

## Agent harness

This repo uses a Cursor agent harness (rules, hooks, skills, file-based memory):

| Layer | Location |
|-------|----------|
| Entry | `llms.txt` → `AGENTS.md` → `PROGRAM.md` |
| Rules | `.cursor/rules/*.mdc` |
| Skills | `.cursor/skills/*/SKILL.md` |
| Hooks | `.cursor/hooks.json` |

```bash
npm run verify:agent-harness
npm run audit:skills
npm run test:hooks
```

Legacy Codex brief: `prompts/codex-brief.md` (redirects to AGENTS.md).

## Deployment

Connect to Cloudflare Pages:

```text
Framework preset: None
Build command: (leave blank)
Build output directory: /
```

See `docs/deployment-notes.md` and `.cursor/skills/artspectiv-deploy/SKILL.md`.

## Brand direction

Dark editorial. Warm ivory. Muted gold. Premium local studio.

## Image rule

Only use the strongest 20–30 images. Filenames must match `docs/image-shot-list.md` and `index.html`.
