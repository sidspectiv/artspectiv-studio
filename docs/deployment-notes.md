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

**Placeholder generation (dev only):** `powershell -File scripts/generate-placeholder-assets.ps1` — replace output with real JPGs before sharing with leads.

**Asset routing:** Do not enable a site-wide SPA rule (`/* → /index.html`) on Cloudflare Pages. Missing `/assets/*.jpg` must 404, not return HTML. The repo includes `_redirects` without a catch-all.

**Verify after deploy:**

```bash
curl -sI https://artspectivstudio.co.uk/assets/rita-hero.jpg
```

Expect `Content-Type: image/jpeg` (not `text/html`).

## Enquiry form (Formspree)

1. Create a form at [formspree.io](https://formspree.io) for `hello@artspectivstudio.co.uk`.
2. Set `assets/site-config.json` → `"formAction": "https://formspree.io/f/YOUR_ID"`.
3. Commit and redeploy. The `#contact` form enables submit; until then, visitors use the email link.

## Custom domain later

Once the site is ready, connect a custom domain such as:

```text
artspectivstudio.co.uk
```

Do this only after the portfolio is ready enough to share with leads.
