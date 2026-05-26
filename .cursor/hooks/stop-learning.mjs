#!/usr/bin/env node
/**
 * stop — record session end for continual-learning batching.
 */
import { stdin } from 'node:process'
import { join } from 'node:path'
import { readFile, writeFile, mkdir } from 'node:fs/promises'

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

async function main() {
  const input = await readStdinJson()
  const root = process.env.CURSOR_PROJECT_DIR || process.env.CLAUDE_PROJECT_DIR || process.cwd()
  const stateDir = join(root, '.cursor', 'hooks', 'state')
  const indexPath = join(stateDir, 'continual-learning-index.json')

  await mkdir(stateDir, { recursive: true })

  let index = {
    lastRun: null,
    lastStopAt: null,
    processedTranscripts: {},
    stopSessions: [],
    notes: '',
  }
  try {
    const raw = await readFile(indexPath, 'utf8')
    index = { ...index, ...JSON.parse(raw) }
  } catch {
    // fresh index
  }

  const now = new Date().toISOString()
  index.lastStopAt = now
  if (!Array.isArray(index.stopSessions)) index.stopSessions = []

  const safeKeys = typeof input === 'object' && input !== null ? Object.keys(input) : []
  index.stopSessions.push({
    at: now,
    inputKeysSample: safeKeys.slice(0, 12),
  })
  if (index.stopSessions.length > 80) {
    index.stopSessions = index.stopSessions.slice(-80)
  }

  await writeFile(indexPath, JSON.stringify(index, null, 2) + '\n', 'utf8')
  process.stderr.write(
    '[stop-learning] Recorded stop. Distil learnings into AGENTS.md when ready (artspectiv-memory skill).\n',
  )
  process.stdout.write('{}\n')
}

main().catch((err) => {
  process.stderr.write(`[stop-learning] ${String(err)}\n`)
  process.stdout.write('{}\n')
})
