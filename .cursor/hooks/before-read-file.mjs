#!/usr/bin/env node
/**
 * Cursor beforeReadFile — block reads of credential/secret paths.
 */
import { Buffer } from 'node:buffer'
import process, { stdin } from 'node:process'
import { collectPathStrings, isBlockedSecretPath } from './lib/sensitive-paths.mjs'

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
        user_message: 'Blocked read: hook payload could not be parsed safely.',
        agent_message: 'Fail closed for secret-path protection.',
      }) + '\n',
    )
    return
  }

  const paths = collectPathStrings(payload)
  for (const p of paths) {
    if (typeof p === 'string' && isBlockedSecretPath(p)) {
      process.stdout.write(
        JSON.stringify({
          permission: 'deny',
          user_message: 'Blocked read: do not read `.env` or credential files via the agent.',
          agent_message: 'Refuse reading secret/credential paths.',
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
      user_message: 'Blocked read: secret-path guard failed unexpectedly.',
      agent_message: 'beforeReadFile failed — deny by default.',
    }) + '\n',
  )
})
