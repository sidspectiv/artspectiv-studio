#!/usr/bin/env node
/**
 * Cursor afterFileEdit — stderr nudge when governance or site entry files change.
 */
import { Buffer } from 'node:buffer'
import { stdin } from 'node:process'

async function readStdinJson() {
  const chunks = []
  for await (const chunk of stdin) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString('utf8').trim()
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

function normPath(p) {
  return p.replace(/\\/g, '/')
}

function governanceHookMessage(filePath, root) {
  const norm = normPath(filePath)
  const rootNorm = normPath(root).replace(/\/$/, '')
  if (!norm.toLowerCase().startsWith(rootNorm.toLowerCase() + '/')) return null
  const rel = norm.slice(rootNorm.length + 1)
  const lower = rel.toLowerCase()

  if (lower === 'program.md') {
    return '[Artspectiv hooks] PROGRAM.md edited: align AGENTS.md **Current Direction** if wave or priorities changed.'
  }
  if (lower === 'agents.md') {
    return '[Artspectiv hooks] AGENTS.md edited: update PROGRAM.md (**Last refined**, wave table) if scope or direction moved.'
  }
  if (lower === 'index.html') {
    return '[Artspectiv hooks] index.html edited: run QA harness (artspectiv-qa.mdc); verify asset filenames vs docs/image-shot-list.md.'
  }
  return null
}

async function main() {
  const payload = await readStdinJson()
  const filePath = payload.file_path
  if (!filePath || typeof filePath !== 'string') {
    process.stdout.write('{}\n')
    return
  }

  const root = process.env.CURSOR_PROJECT_DIR || process.env.CLAUDE_PROJECT_DIR || process.cwd()
  const msg = governanceHookMessage(filePath, root)
  if (msg) console.error(msg)

  process.stdout.write('{}\n')
}

main().catch((err) => {
  console.error('[after-file-edit hook]', err)
  process.stdout.write('{}\n')
})
