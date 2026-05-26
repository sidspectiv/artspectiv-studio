#!/usr/bin/env node
/**
 * Pre-deploy checks for Artspectiv static site → Cloudflare Pages.
 * Run: npm run predeploy
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const root = process.cwd()
const errors = []
const warnings = []

function fail(msg) {
  errors.push(msg)
}

function warn(msg) {
  warnings.push(msg)
}

function read(rel) {
  const abs = join(root, rel)
  if (!existsSync(abs)) {
    fail(`Missing required file: ${rel}`)
    return ''
  }
  return readFileSync(abs, 'utf8')
}

function checkSiteConfig() {
  const raw = read('assets/site-config.json')
  if (!raw) return
  let cfg
  try {
    cfg = JSON.parse(raw)
  } catch {
    fail('assets/site-config.json is not valid JSON')
    return
  }
  const action = String(cfg.formAction || '').trim()
  if (!action) {
    fail('assets/site-config.json: formAction is empty (Formspree not wired)')
  } else if (!/^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(action)) {
    fail(`assets/site-config.json: formAction looks invalid: ${action}`)
  }
}

function checkIndexHtml() {
  const html = read('index.html')
  if (!html) return

  if (!html.includes('Request a content shoot')) {
    fail('index.html: primary CTA copy "Request a content shoot" not found')
  }

  const legacy = ['£225', '£695', '£1,095', '225/', '695/', '1095']
  for (const p of legacy) {
    if (html.includes(p)) fail(`index.html: legacy pricing reference found (${p})`)
  }

  for (const p of ['£445', '£945', '£1,595']) {
    if (!html.includes(p)) warn(`index.html: expected price ${p} not found`)
  }

  if (/mailto:/i.test(html)) fail('index.html: mailto link still present (use Formspree form only)')
  if (/hello@artspectivstudio\.co\.uk/i.test(html)) {
    fail('index.html: public hello@ email still visible')
  }

  if (!html.includes('id="contact"')) fail('index.html: #contact section missing')
  if (!html.includes('id="enquiry-form"')) fail('index.html: enquiry form missing')

  const assetRefs = [...html.matchAll(/src="(assets\/[^"]+)"/g)].map((m) => m[1])
  const missing = assetRefs.filter((rel) => !existsSync(join(root, rel)))
  if (missing.length) {
    warn(
      `index.html: ${missing.length} referenced asset(s) missing locally (OK for dev; replace before lead outreach):\n  ${missing.slice(0, 8).join('\n  ')}${missing.length > 8 ? `\n  …and ${missing.length - 8} more` : ''}`,
    )
  }
}

function checkRedirects() {
  const raw = read('_redirects')
  if (!raw) return
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    if (/\/\*\s+\/index\.html\s+200/i.test(t)) {
      fail('_redirects: SPA catch-all would break /assets/* routing — remove /* → /index.html 200')
    }
  }
}

function checkSecretsNotStaged() {
  const r = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' })
  if (r.status !== 0) return
  const staged = (r.stdout || '').split(/\r?\n/).filter(Boolean)
  const blocked = staged.filter((f) => /^\.env($|\.)/.test(f) || /credentials|secret/i.test(f))
  if (blocked.length) {
    fail(`Staged files look like secrets — unstage before deploy:\n  ${blocked.join('\n  ')}`)
  }
}

function checkRootFiles() {
  for (const f of ['index.html', '_redirects', 'assets/site-config.json']) {
    if (!existsSync(join(root, f))) fail(`Missing deploy artifact: ${f}`)
  }
}

function runHarnessVerify() {
  const r = spawnSync(process.execPath, ['.cursor/scripts/verify-agent-harness.mjs'], {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  if (r.status !== 0) {
    fail(`verify:agent-harness failed:\n${(r.stderr || r.stdout || '').trim()}`)
  }
}

function main() {
  console.log('[predeploy] Artspectiv → Cloudflare Pages pre-flight\n')

  checkRootFiles()
  checkSiteConfig()
  checkIndexHtml()
  checkRedirects()
  checkSecretsNotStaged()
  runHarnessVerify()

  if (warnings.length) {
    console.log('Warnings:')
    for (const w of warnings) console.log(`  ⚠ ${w.replace(/\n/g, '\n    ')}`)
    console.log('')
  }

  if (errors.length) {
    console.error('Failed checks:')
    for (const e of errors) console.error(`  ✗ ${e.replace(/\n/g, '\n    ')}`)
    console.error(`\n[predeploy] BLOCKED — ${errors.length} error(s). Fix before push.`)
    process.exit(1)
  }

  console.log('[predeploy] OK — site config, index.html, redirects, harness verify.')
  if (warnings.length) console.log('[predeploy] Review warnings above before sharing with leads.')
  process.exit(0)
}

main()
