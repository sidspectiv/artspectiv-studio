# Deployment Notes

## Recommended hosting

Use **Cloudflare Pages** with GitHub integration.

Architecture:

```text
GitHub repo → Cloudflare Pages → Live website
```

## Cloudflare Pages settings

When creating the project in Cloudflare Pages, use:

```text
Framework preset: None
Build command: leave blank
Build output directory: /
```

## Why this setup

- Free hosting
- No platform branding on the site
- Auto-deploys on every push to `main`
- Easy rollback through GitHub commits
- Clean workflow for Codex or other coding assistants

## Update workflow

1. Edit files locally or through GitHub/Codex.
2. Commit changes to `main`.
3. Cloudflare Pages auto-deploys.
4. Check the live URL.

## Image workflow

1. Choose final images.
2. Resize to 1800–2400px long side.
3. Compress with TinyPNG, Squoosh or ImageOptim.
4. Upload to `assets/` using the filenames in `docs/image-shot-list.md`.
5. Commit and wait for Cloudflare to redeploy.

## Custom domain later

Once the site is ready, connect a custom domain such as:

```text
artspectivstudio.co.uk
```

Do this only after the portfolio is ready enough to share with leads.
