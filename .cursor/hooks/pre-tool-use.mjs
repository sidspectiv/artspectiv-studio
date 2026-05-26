#!/usr/bin/env node
/**
 * Cursor preToolUse — block mutating writes into credential/secret paths.
 */
import { Buffer } from 'node:buffer'
import process, { stdin } from 'node:process'
import { collectPathStrings, isBlockedSecretPath } from './lib/sensitive-paths.mjs'

const MUTATING_FILE_TOOLS = new Set([
  'Write',
  'Edit',
  'MultiEdit',
  'Delete',
  'ApplyPatch',
  'EditNotebook',
])

async function readStdinJson() {
  const chunks = []
  for await (const chunk of stdin) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString('utf8').trim()
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

async function main() {
  const payload = await readStdinJson()
  if (!payload || typeof payload !== 'object') {
    process.stdout.write(
      JSON.stringify({
        permission: 'deny',
        user_message: 'Blocked write: hook payload could not be parsed safely.',
        agent_message: 'Fail closed for secret-path protection.',
      }) + '\n',
    )
    return
  }

  const toolName = String(payload.tool_name || '')
  if (!MUTATING_FILE_TOOLS.has(toolName)) {
    process.stdout.write(JSON.stringify({ permission: 'allow' }) + '\n')
    return
  }

  const paths = collectPathStrings(payload.tool_input)
  for (const p of paths) {
    if (typeof p === 'string' && isBlockedSecretPath(p)) {
      process.stdout.write(
        JSON.stringify({
          permission: 'deny',
          user_message:
            'Blocked write: do not create or overwrite `.env` or credential files via the agent.',
          agent_message: 'Refuse writing to secret/credential paths.',
        }) + '\n',
      )
      return
    }
  }

  process.stdout.write(JSON.stringify({ permission: 'allow' }) + '\n')
}

main().catch(() => {
  process.stdout.write(
    JSON.stringify({
      permission: 'deny',
      user_message: 'Blocked write: secret-path guard failed unexpectedly.',
      agent_message: 'preToolUse failed — deny by default.',
    }) + '\n',
  )
})
