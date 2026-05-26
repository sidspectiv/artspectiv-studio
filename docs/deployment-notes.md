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
2. Run pre-deploy checks: `npm run predeploy` (or Cursor command **`/deploy-cloudflare`**).
3. Commit changes to `main` and push.
4. Cloudflare Pages auto-deploys.
5. Post-deploy: curl checks below + spot-check `/#contact` form.

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

1. Form endpoint: `https://formspree.io/f/xpqnodlk` (notifications in Formspree dashboard).
2. `assets/site-config.json` → `formAction` must match that URL.
3. In Formspree, allow domains: `artspectivstudio.co.uk`, your `*.pages.dev` preview host, and `localhost` for local tests.
4. Commit and redeploy after changing `formAction`.

## Custom domain later

Once the site is ready, connect a custom domain such as:

```text
artspectivstudio.co.uk
```

Do this only after the portfolio is ready enough to share with leads.
