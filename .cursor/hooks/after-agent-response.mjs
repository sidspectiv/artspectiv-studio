#!/usr/bin/env node
/**
 * afterAgentResponse — nudge durable memory updates and PROGRAM sync.
 */
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

function shouldNudge(text) {
  if (typeof text !== 'string' || text.length < 80) return false
  const patterns = [
    /lesson\s*:/i,
    /gotcha/i,
    /Decision Log/i,
    /append to AGENTS\.md/i,
    /non-obvious constraint/i,
    /root cause was/i,
    /should (always|never)/i,
    /discovered that/i,
    /promot(e|ing) to \.?mdc/i,
  ]
  return patterns.some((re) => re.test(text))
}

function shouldProgramSteeringNudge(text) {
  if (typeof text !== 'string' || text.length < 60) return false
  if (
    /\bPROGRAM\.md\b/i.test(text) &&
    /\b(last refined|launch wave|wave status|updated)\b/i.test(text)
  ) {
    return false
  }
  const patterns = [
    /\bwave\s*[0-9]/i,
    /\blaunch wave\b/i,
    /\bPROGRAM\.md\b/i,
    /\bCurrent Direction\b/i,
    /\b(wave|waves)\b.*\b(complete|completed|done|shipped)\b/i,
  ]
  return patterns.some((re) => re.test(text))
}

function shouldPlanNudge(text) {
  if (typeof text !== 'string' || text.length < 200) return false
  if (/plan|writing-plans|\.cursor\/plans/i.test(text)) return false
  return /multi-?section|refactor|\bcomplex\b/i.test(text)
}

const main = async () => {
  const input = await readStdinJson()
  const text = input.text ?? ''

  if (shouldNudge(text)) {
    console.error(
      '[Artspectiv hooks] Durable learning detected. If it should recur, append AGENTS.md Decision Log (see artspectiv-memory skill).',
    )
  }

  if (shouldPlanNudge(text)) {
    console.error(
      '[Artspectiv hooks] Consider a formal plan: `.cursor/skills/writing-plans/SKILL.md` and `.cursor/plans/`.',
    )
  }

  if (shouldProgramSteeringNudge(text)) {
    console.error(
      '[Artspectiv hooks] Wave/roadmap steering detected. Update **PROGRAM.md** (Last refined, wave table) and AGENTS.md **Current Direction** if priorities moved.',
    )
  }

  process.stdout.write(JSON.stringify({}) + '\n')
}

main().catch((err) => {
  console.error('[after-agent-response hook]', err)
  process.stdout.write(JSON.stringify({}) + '\n')
})
