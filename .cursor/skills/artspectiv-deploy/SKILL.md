---
name: artspectiv-deploy
description: Cloudflare Pages deploy, rollback, and image upload workflow for the static Artspectiv site.
---

# Artspectiv — deploy and assets

Distilled from `docs/deployment-notes.md`.

## Cloudflare Pages settings

```text
Framework preset: None
Build command: (leave blank)
Build output directory: /
```

GitHub → Cloudflare Pages → live site. Every push to `main` auto-deploys when connected.

## Update workflow

1. Edit `index.html` and/or `assets/` locally or via GitHub.
2. Run **`/deploy-cloudflare`** (or `npm run predeploy` then commit + push).
3. Wait for Cloudflare deploy (check dashboard).
4. Verify live URL: CTA, images, mobile layout.

**Cursor command:** `.cursor/commands/deploy-cloudflare.md` — full verify → commit → push → curl smoke pipeline.

## Rollback

Revert the Git commit on `main` and let Cloudflare redeploy the previous version.

## Image workflow

1. Select final images (strongest 20–30 only).
2. Resize long side to 1800–2400px.
3. Compress (TinyPNG, Squoosh, ImageOptim) — target under 500KB per image, hero under 700KB.
4. Upload to `assets/` using filenames in `docs/image-shot-list.md`.
5. Commit and redeploy.

## Custom domain (later)

Connect `artspectivstudio.co.uk` in Cloudflare when portfolio is ready to share with leads.

## Verification

- No build command required — if Cloudflare asks for one, leave blank.
- Spot-check `assets/` references in `index.html` match uploaded files.
- Run `npm run verify:agent-harness` after harness changes only.
