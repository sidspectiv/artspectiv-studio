# Deploy to Cloudflare

Production deploy pipeline for Artspectiv Studio: **verify → commit → push to GitHub → post-deploy smoke**. Cloudflare Pages auto-builds from `main` (no build command; output `/`).

## Read first

- `.cursor/skills/artspectiv-deploy/SKILL.md`
- `docs/deployment-notes.md`
- `.cursor/skills/verification-before-completion/SKILL.md`

## Pipeline (run in order — do not skip steps)

### 1. Pre-flight (automated)

```bash
npm run predeploy
```

This checks: `site-config.json` / Formspree `formAction`, pricing guardrails, no `mailto` or public `hello@` in `index.html`, `_redirects` (no SPA catch-all), no staged secrets, `npm run verify:agent-harness`.

**If `predeploy` fails:** fix issues, re-run until green. Do not push.

### 2. Git state

Run in parallel:

```bash
git status
git diff
git log -3 --oneline
```

- Confirm branch is **`main`** (or the branch Cloudflare Pages watches).
- Confirm no `.env` / credentials staged.
- Summarise what will ship for the user.

### 3. Site QA (manual spot-check)

Use `.cursor/rules/artspectiv-qa.mdc` — at minimum:

- [ ] Primary CTA → `#contact` (hero + sticky)
- [ ] Packages: Starter £445, Monthly £945, Campaign £1,595
- [ ] Form submit enabled (not “form unavailable”)
- [ ] Section order matches AGENTS.md narrative

Optional local open: serve repo root and open `index.html` or use a static server on port 8080.

### 4. Commit (when there are changes)

Only when this command was invoked and the user intends to deploy:

```bash
git add -A
git status
```

Draft a concise commit message (why, not file list). Commit with a HEREDOC message. **Do not** use `--no-verify` unless the user explicitly asked.

If **nothing to commit**, say so and continue to push only if ahead of remote.

### 5. Push to GitHub

```bash
git push origin main
```

Requires network. **Never** `git push --force` to `main` unless the user explicitly requested it.

If push is rejected, report and stop — do not force.

### 6. Wait for Cloudflare Pages

- Cloudflare dashboard → Pages → project → latest deployment **Success**.
- Or poll live site (see step 7) until HTML/config reflects the push.

Typical wait: 1–3 minutes after push.

### 7. Post-deploy smoke (live)

Default origin: **`https://artspectivstudio.co.uk`** (override with env `DEPLOY_ORIGIN` if testing a `*.pages.dev` URL).

```bash
curl -sI "%DEPLOY_ORIGIN%/"
curl -sI "%DEPLOY_ORIGIN%/assets/site-config.json"
curl -sI "%DEPLOY_ORIGIN%/assets/rita-hero.jpg"
```

Expect:

- `/` → `200`, `content-type` includes `text/html`
- `site-config.json` → `200`, body contains `formspree.io/f/`
- `rita-hero.jpg` → `200`, `content-type: image/jpeg` (not `text/html` — proves no SPA catch-all on assets)

Optional Formspree (only if user asked for a live test submission): submit via `/#contact` in browser; confirm email in Formspree dashboard. Do not spam production with automated test posts unless agreed.

### 8. Formspree dashboard (if form changed)

- Allowed domains include `artspectivstudio.co.uk` and preview host
- Notification email verified

## Handoff format

```text
## Deploy
- Branch: main @ <short sha>
- Pushed: yes/no
- Cloudflare: Success / pending / failed

## Verified
- npm run predeploy → OK
- curl / → …
- curl site-config.json → …
- curl rita-hero.jpg → …

## Remaining
- …
```

Update `docs/design-audit.md` § hosted form if this deploy completes Wave 2 verification on production.

## Do not

- Add a build command to Cloudflare (static site — output `/`, build blank)
- Enable `/* /index.html 200` in `_redirects`
- Commit secrets or `.env`
- Force-push `main`
