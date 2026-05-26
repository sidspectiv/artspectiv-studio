#!/usr/bin/env node
/**
 * Light smoke tests for session-start.mjs
 * Run: node .cursor/hooks/tests/session-start.test.mjs
 */
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { countWords, GLOBAL_WORD_CAP } from '../lib/brief-budgets.mjs'

const root = process.cwd()
const hookPath = join(root, '.cursor', 'hooks', 'session-start.mjs')

function runHook(envExtra = {}) {
  const r = spawnSync(process.execPath, [hookPath], {
    cwd: root,
    input: '{}',
    encoding: 'utf8',
    env: { ...process.env, CURSOR_PROJECT_DIR: root, ...envExtra },
  })
  if (r.status !== 0) {
    throw new Error(`session-start exit ${r.status}: ${r.stderr}`)
  }
  return JSON.parse(r.stdout.trim())
}

let failed = 0

function assert(cond, msg) {
  if (!cond) {
    console.error('FAIL:', msg)
    failed += 1
  } else {
    console.log('OK:', msg)
  }
}

try {
  const full = runHook()
  assert(full.additional_context, 'additional_context present')
  assert(
    full.additional_context.includes('Active Constraints'),
    'brief includes Active Constraints slice',
  )
  const words = countWords(full.additional_context)
  assert(words <= GLOBAL_WORD_CAP + 80, `word count ~within cap (${words} words, cap ${GLOBAL_WORD_CAP})`)

  const sub = runHook({ CURSOR_SUBAGENT: 'true' })
  assert(sub.additional_context.includes('Subagent mode'), 'subagent minimal banner')
  assert(
    !sub.additional_context.includes('Project skills'),
    'subagent mode omits skill catalogue',
  )

  const agents = readFileSync(join(root, 'AGENTS.md'), 'utf8')
  assert(agents.includes('DL-001'), 'AGENTS.md has DL-001 for harness test')
} catch (e) {
  console.error('FAIL:', e.message)
  failed += 1
}

if (failed > 0) {
  process.exit(1)
}
console.log(`\n${failed === 0 ? 'All session-start tests passed.' : failed + ' failed.'}`)
