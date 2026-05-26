#!/usr/bin/env node
/**
 * Lists SKILL.md under .cursor/skills and .agents/skills.
 * Run: npm run audit:skills
 */
import { readdir, readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

const root = process.cwd()
const sources = [
  { skillsDir: join(root, '.cursor', 'skills'), label: '.cursor/skills' },
  { skillsDir: join(root, '.agents', 'skills'), label: '.agents/skills' },
]

function extractDescription(raw) {
  const quoted = raw.match(/description:\s*"([^"]+)"/i)
  if (quoted) return quoted[1].slice(0, 100)
  const single = raw.match(/description:\s*'([^']+)'/i)
  if (single) return single[1].slice(0, 100)
  const plain = raw.match(/description:\s*([^\n]+?)\s*(?:\n|$)/i)
  if (plain) return plain[1].trim().slice(0, 100)
  return '(no description in frontmatter)'
}

async function run() {
  const seenNames = new Set()
  let totalActive = 0

  for (const { skillsDir, label } of sources) {
    const rows = []
    let names = []
    try {
      names = await readdir(skillsDir)
    } catch {
      continue
    }

    const dirs = []
    for (const n of names) {
      try {
        const st = await stat(join(skillsDir, n))
        if (st.isDirectory()) dirs.push(n)
      } catch {
        // skip
      }
    }
    dirs.sort()

    for (const name of dirs) {
      const skillPath = join(skillsDir, name, 'SKILL.md')
      try {
        const st = await stat(skillPath)
        if (!st.isFile()) continue
        const raw = await readFile(skillPath, 'utf8')
        const lineCount = raw.split(/\r?\n/).length
        const deduped = seenNames.has(name)
        rows.push({ name, lineCount, desc: extractDescription(raw), deduped })
        seenNames.add(name)
      } catch {
        // skip
      }
    }

    const active = rows.filter((r) => !r.deduped)
    console.log(`\n${label}  (${active.length} active)\n`)
    for (const r of rows) {
      const tag = r.deduped ? ' [shadowed]' : ''
      console.log([r.name + tag, 'lines=' + r.lineCount, r.desc].join('\t'))
    }
    totalActive += active.length
  }

  console.log(`\nTotal active: ${totalActive} skills`)
}

run().catch((e) => {
  console.error('audit-skills:', e)
  process.exitCode = 1
})
