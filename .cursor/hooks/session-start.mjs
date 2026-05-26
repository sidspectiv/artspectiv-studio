#!/usr/bin/env node
/**
 * Cursor sessionStart — token-budgeted brief from template + AGENTS slices + skill index.
 * @see https://cursor.com/docs/hooks
 */
import { readFile, readdir, stat } from 'node:fs/promises'
import { Buffer } from 'node:buffer'
import { join } from 'node:path'
import process, { stdin } from 'node:process'
import {
  SECTION_WORD_CAPS,
  SKILL_BLURB_MAX_CHARS,
  balanceGlobalWordBudget,
  truncateWords,
  envInt,
} from './lib/brief-budgets.mjs'

const SUBAGENT_MODE = process.env.CURSOR_SUBAGENT === 'true'
const RECENT_DL_CAP = envInt('ARTSPECTIV_BRIEF_RECENT_DL', 3)

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

function buildContextHealthFooter() {
  return [
    '## Context health (guidance)',
    'Long threads accumulate noise. If quality drops, summarise and start fresh; persist durable facts to AGENTS.md Decision Log.',
    '',
  ].join('\n')
}

function buildSubagentModeBanner() {
  return [
    '## Subagent mode (minimal context)',
    'Return a condensed summary (1–2k tokens max): outcomes, paths touched, blockers, next steps.',
    '',
  ].join('\n')
}

function parseActiveConstraints(agentsContent) {
  try {
    const match = agentsContent.match(/## Active Constraints and Gotchas\n\n([\s\S]*?)\n\n---/)
    if (!match) return null

    const section = match[1]
    const bullets = section.match(/^- \*\*(.+?)\*\*:(.+?)$/gm)
    if (!bullets) return null

    let output = '## Active Constraints (from AGENTS.md)\n'
    bullets.slice(0, 6).forEach((bullet) => {
      const keyMatch = bullet.match(/\*\*(.+?)\*\*/)
      const valueMatch = bullet.match(/\*\*:\s*(.+?)\./)
      if (keyMatch && valueMatch) {
        output += `${keyMatch[1]}: ${valueMatch[1]}\n`
      }
    })
    return output
  } catch {
    return null
  }
}

function parseRecentDecisions(agentsContent) {
  try {
    const dlMatches = [
      ...agentsContent.matchAll(/### (DL-\d+):[^\n]*\(\d{4}-\d{2}-\d{2}\)[\s\S]*?\*\*Decision:\*\* ([^\n]+)/g),
    ]
    if (dlMatches.length === 0) return null

    let output = '## Recent Decisions (from AGENTS.md)\n'
    dlMatches.slice(0, RECENT_DL_CAP).forEach((match) => {
      const [, dlId, decision] = match
      output += `${dlId}: ${decision.replace(/\s+/g, ' ').trim()}\n`
    })
    return output
  } catch {
    return null
  }
}

function parseDirection(agentsContent) {
  try {
    const match = agentsContent.match(/## Current Direction\n\n([\s\S]*?)\n\n---/)
    if (!match) return null

    const section = match[1]
    const bullets = section.match(/^- .+$/gm)
    if (!bullets) return null

    const firstThree = bullets.slice(0, 3).map((b) => b.replace(/^- /, '')).join('; ')
    return `## Direction (from AGENTS.md)\n${firstThree}\n`
  } catch {
    return null
  }
}

async function buildSkillDirectorySummary(root) {
  const lines = ['## Project skills (Read on demand)', '']
  const sources = [
    { skillsDir: join(root, '.cursor', 'skills'), label: '.cursor/skills' },
    { skillsDir: join(root, '.agents', 'skills'), label: '.agents/skills' },
  ]
  const seenNames = new Set()

  for (const { skillsDir, label } of sources) {
    let names = []
    try {
      names = await readdir(skillsDir)
    } catch {
      continue
    }

    const dirs = []
    for (const n of names) {
      try {
        const stDir = await stat(join(skillsDir, n))
        if (stDir.isDirectory()) dirs.push(n)
      } catch {
        // skip
      }
    }

    dirs.sort()
    for (const name of dirs) {
      if (seenNames.has(name)) continue
      const skillPath = join(skillsDir, name, 'SKILL.md')
      try {
        const st = await stat(skillPath)
        if (!st.isFile()) continue
        const raw = await readFile(skillPath, 'utf8')
        let blurb = 'see SKILL.md'
        const dq = raw.match(/description:\s*"([^"]+)"/i)
        const sq = raw.match(/description:\s*'([^']+)'/i)
        const plain = raw.match(/description:\s*([^\n]+?)\s*(?:\n|$)/i)
        const maxB = SKILL_BLURB_MAX_CHARS
        if (dq) blurb = dq[1].slice(0, maxB)
        else if (sq) blurb = sq[1].slice(0, maxB)
        else if (plain) blurb = plain[1].trim().slice(0, maxB)

        lines.push(`- \`${name}\` (${label}): ${blurb}`)
        seenNames.add(name)
      } catch {
        // skip
      }
    }
  }

  lines.push('')
  return lines.join('\n')
}

function buildQualityReminder() {
  return [
    '## Output quality (session)',
    'Lead with the answer; UK English; minimal filler.',
    '',
  ].join('\n')
}

async function main() {
  await readStdinJson()

  const root = process.env.CURSOR_PROJECT_DIR || process.env.CLAUDE_PROJECT_DIR || process.cwd()
  const templatePath = join(root, '.cursor', 'artspectiv-agent-brief.template.md')
  let staticBase = ''
  try {
    staticBase = await readFile(templatePath, 'utf8')
  } catch {
    staticBase = '[Artspectiv] Template missing. Read llms.txt and AGENTS.md.'
  }

  const agentsPath = join(root, 'AGENTS.md')
  let agentsContent = ''
  try {
    agentsContent = await readFile(agentsPath, 'utf8')
  } catch {
    // optional
  }

  if (SUBAGENT_MODE) {
    let constraintsBlock = ''
    if (agentsContent) {
      const constraints = parseActiveConstraints(agentsContent)
      if (constraints) constraintsBlock = truncateWords(constraints, SECTION_WORD_CAPS.constraints)
    }
    const dynamicMinimal = [constraintsBlock, buildSubagentModeBanner(), buildContextHealthFooter()]
      .map((s) => String(s || '').trimEnd())
      .filter(Boolean)
      .join('\n\n')
    const final = `${staticBase.trimEnd()}\n\n${dynamicMinimal}`.trimEnd()
    const header =
      '\n\n---\n**Artspectiv project context** (sessionStart — **subagent minimal**)\n\n'
    process.stdout.write(JSON.stringify({ additional_context: header + final + '\n' }) + '\n')
    return
  }

  const slices = {
    constraints: '',
    decisions: '',
    direction: '',
    deeper: '',
    skills: '',
    quality: '',
  }

  if (agentsContent) {
    const constraints = parseActiveConstraints(agentsContent)
    if (constraints) slices.constraints = truncateWords(constraints, SECTION_WORD_CAPS.constraints)

    const decisions = parseRecentDecisions(agentsContent)
    if (decisions) slices.decisions = truncateWords(decisions, SECTION_WORD_CAPS.decisions)

    const direction = parseDirection(agentsContent)
    if (direction) slices.direction = truncateWords(direction, SECTION_WORD_CAPS.direction)
  }

  slices.deeper = truncateWords(
    [
      '## Deeper context (expand on demand)',
      'PROGRAM.md | AGENTS.md | CONTEXT.md | docs/commercial-strategy.md | .cursor/rules/*.mdc | docs/design-audit.md',
    ].join('\n'),
    SECTION_WORD_CAPS.deeper,
  )

  const skillDirectorySummary = await buildSkillDirectorySummary(root)
  if (skillDirectorySummary) {
    slices.skills = truncateWords(skillDirectorySummary.trimEnd(), SECTION_WORD_CAPS.skills)
  }
  slices.quality = truncateWords(buildQualityReminder().trimEnd(), SECTION_WORD_CAPS.quality)

  const dynamicSections = balanceGlobalWordBudget(staticBase.trimEnd(), slices)
  const final = `${staticBase.trimEnd()}\n\n${dynamicSections.trimEnd()}\n\n${buildContextHealthFooter().trimEnd()}`
  const header = '\n\n---\n**Artspectiv project context** (auto-composed via sessionStart hook)\n\n'
  process.stdout.write(JSON.stringify({ additional_context: header + final + '\n' }) + '\n')
}

main().catch((err) => {
  process.stderr.write(`[session-start hook] ${String(err)}\n`)
  process.stdout.write(JSON.stringify({ additional_context: '' }) + '\n')
})
