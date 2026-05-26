#!/usr/bin/env node
/**
 * CI guard: Decision Log IDs, skill trigger matrix paths, hooks.json scripts, hook smoke.
 * Run: npm run verify:agent-harness
 */
import { readFileSync, existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()

function die(msg) {
  console.error(msg)
  process.exit(1)
}

/** @returns {{ id: string, n: number }[]} */
export function findDuplicateDlHeadings(markdown) {
  const re = /^### (DL-\d+):/gm
  const seen = new Map()
  let m
  while ((m = re.exec(markdown)) !== null) {
    const id = m[1]
    seen.set(id, (seen.get(id) || 0) + 1)
  }
  const dupes = []
  for (const [id, n] of seen) {
    if (n > 1) dupes.push({ id, n })
  }
  return dupes.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
}

/** @param {string} markdown @param {string} label */
export function assertNoDuplicateDlHeadings(markdown, label) {
  const dupes = findDuplicateDlHeadings(markdown)
  if (dupes.length) {
    throw new Error(
      `[verify-agent-harness] Duplicate Decision Log IDs in ${label}: ${dupes.map((d) => `${d.id} (${d.n}×)`).join(', ')}`,
    )
  }
}

function skillPathCandidates(folder) {
  const f = folder.trim()
  return [join(root, '.cursor', 'skills', f, 'SKILL.md'), join(root, '.agents', 'skills', f, 'SKILL.md')]
}

function resolveSkillFolder(token) {
  let t = token.replace(/^`+|`+$/g, '').trim()
  if (!t) return null
  if (t.includes(' + ')) {
    const parts = t.split(/\s*\+\s*/).map((p) => p.replace(/^`+|`+$/g, '').trim())
    const missing = []
    for (const p of parts) {
      const folder = resolveSkillFolder(p)
      if (!folder) continue
      if (!skillPathCandidates(folder).some((path) => existsSync(path))) missing.push(p)
    }
    if (missing.length) {
      die(`[verify-agent-harness] Required skill path not found for: ${missing.join(' ; ')}`)
    }
    return null
  }
  if (t.includes('/skills/')) t = t.split('/').pop() || t
  if (t.startsWith('.agents/skills/')) t = t.replace(/^\.agents\/skills\//, '')
  if (t.startsWith('.cursor/skills/')) t = t.replace(/^\.cursor\/skills\//, '')
  return t.replace(/\/$/, '')
}

function verifySkillMatrix() {
  const mdcPath = join(root, '.cursor', 'rules', 'artspectiv-agent-workflow.mdc')
  const raw = readFileSync(mdcPath, 'utf8')
  const start = raw.indexOf('## Skill trigger matrix')
  const end = raw.indexOf('\n## QA and handoff', start)
  if (start < 0 || end < 0) {
    die('[verify-agent-harness] Could not find skill trigger matrix in artspectiv-agent-workflow.mdc')
  }
  const block = raw.slice(start, end)
  for (const line of block.split(/\r?\n/)) {
    if (!line.trim().startsWith('|')) continue
    if (/^\|\s*Surface/.test(line)) continue
    if (/^\|\s*-+/.test(line)) continue
    const cells = line.split('|').map((c) => c.trim())
    if (cells.length < 3) continue
    const skillCell = cells[2] || ''
    const backticks = [...skillCell.matchAll(/`([^`]+)`/g)].map((x) => x[1])
    for (const tok of backticks) {
      const folder = resolveSkillFolder(tok)
      if (folder === null) continue
      const paths = skillPathCandidates(folder)
      if (!paths.some((p) => existsSync(p))) {
        die(
          `[verify-agent-harness] SKILL.md missing for matrix token "${tok}" (folder "${folder}"). Tried:\n  ${paths.join('\n  ')}`,
        )
      }
    }
  }
}

function verifyHooksJson() {
  const hooksPath = join(root, '.cursor', 'hooks.json')
  const hooks = JSON.parse(readFileSync(hooksPath, 'utf8'))
  for (const [, entries] of Object.entries(hooks.hooks || {})) {
    if (!Array.isArray(entries)) continue
    for (const e of entries) {
      if (!e.command || typeof e.command !== 'string') continue
      const m = e.command.match(/node\s+(\S+\.mjs)/)
      if (!m) continue
      const rel = m[1].replace(/^\.\//, '')
      const abs = join(root, rel)
      if (!existsSync(abs)) {
        die(`[verify-agent-harness] hooks.json references missing script: ${rel}`)
      }
    }
  }
}

function hookSmoke(rel, stdinStr) {
  const abs = join(root, rel)
  const r = spawnSync(process.execPath, [abs], {
    cwd: root,
    input: stdinStr,
    encoding: 'utf8',
    env: { ...process.env, CURSOR_PROJECT_DIR: root },
  })
  if (r.status !== 0) {
    die(`[verify-agent-harness] Hook smoke failed (${rel}) exit=${r.status}\nstderr:\n${r.stderr}`)
  }
  return r.stdout
}

export function main() {
  const agents = readFileSync(join(root, 'AGENTS.md'), 'utf8')
  try {
    assertNoDuplicateDlHeadings(agents, 'AGENTS.md')
  } catch (e) {
    die(e instanceof Error ? e.message : String(e))
  }

  verifySkillMatrix()
  verifyHooksJson()

  const sessionOut = hookSmoke('.cursor/hooks/session-start.mjs', '{}')
  let parsed
  try {
    parsed = JSON.parse(sessionOut.trim())
  } catch {
    die('[verify-agent-harness] session-start did not return valid JSON')
  }
  if (!parsed.additional_context || String(parsed.additional_context).trim().length < 50) {
    die('[verify-agent-harness] session-start additional_context too short or missing')
  }

  hookSmoke('.cursor/hooks/after-agent-response.mjs', JSON.stringify({ text: 'Smoke test stub.' }))
  hookSmoke('.cursor/hooks/stop-learning.mjs', '{}')

  console.log('[verify-agent-harness] OK — DL ids, skill matrix paths, hooks.json paths, hook smoke.')
}

const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) main()
