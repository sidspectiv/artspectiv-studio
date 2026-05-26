/**
 * Session brief word budgets for session-start.mjs.
 * Override via ARTSPECTIV_BRIEF_* env vars.
 */

export function envInt(key, fallback) {
  const v = process.env[key]
  if (v === undefined || v === '') return fallback
  const n = parseInt(v, 10)
  return Number.isFinite(n) && n > 0 ? n : fallback
}

/** Max combined words: static template + assembled dynamic slices. */
export const GLOBAL_WORD_CAP = envInt('ARTSPECTIV_BRIEF_GLOBAL_WORD_CAP', 220)

export const SECTION_WORD_CAPS = {
  constraints: envInt('ARTSPECTIV_BRIEF_CONSTRAINTS_WORDS', 48),
  decisions: envInt('ARTSPECTIV_BRIEF_DECISIONS_WORDS', 48),
  direction: envInt('ARTSPECTIV_BRIEF_DIRECTION_WORDS', 32),
  deeper: envInt('ARTSPECTIV_BRIEF_DEEPER_WORDS', 28),
  skills: envInt('ARTSPECTIV_BRIEF_SKILLS_WORDS', 64),
  quality: envInt('ARTSPECTIV_BRIEF_QUALITY_WORDS', 24),
}

export const SKILL_BLURB_MAX_CHARS = envInt('ARTSPECTIV_BRIEF_SKILL_BLURB_CHARS', 80)

export function countWords(text) {
  const t = String(text || '').trim()
  if (!t) return 0
  return t.split(/\s+/).length
}

export function truncateWords(text, maxWords) {
  const t = String(text || '').trim()
  if (!t || maxWords <= 0) return ''
  const words = t.split(/\s+/)
  if (words.length <= maxWords) return t
  return `${words.slice(0, maxWords).join(' ')}\n[...truncated]`
}

export const SLICE_DISPLAY_ORDER = ['deeper', 'quality', 'skills', 'constraints', 'decisions', 'direction']

export const SLICE_TRIM_ORDER = ['skills', 'deeper', 'quality', 'direction', 'decisions', 'constraints']

export const SLICE_MINS = {
  skills: 12,
  deeper: 8,
  quality: 10,
  direction: 6,
  decisions: 10,
  constraints: 14,
}

/**
 * @param {string} staticBase
 * @param {Record<string, string>} slices
 */
export function balanceGlobalWordBudget(staticBase, slices) {
  const displayOrder = SLICE_DISPLAY_ORDER
  const trimOrder = SLICE_TRIM_ORDER
  const mins = SLICE_MINS

  function assemble() {
    return displayOrder
      .map((k) => slices[k])
      .filter(Boolean)
      .join('\n\n')
  }

  let dynamic = assemble()
  let total = countWords(staticBase) + countWords(dynamic)
  let guard = 0
  while (total > GLOBAL_WORD_CAP && guard < 200) {
    guard += 1
    let trimmed = false
    for (const key of trimOrder) {
      const chunk = slices[key]
      if (!chunk) continue
      const w = countWords(chunk)
      const floor = mins[key] ?? 8
      if (w <= floor) continue
      const nextCap = Math.max(floor, Math.floor(w * 0.82))
      slices[key] = truncateWords(chunk, nextCap)
      trimmed = true
      break
    }
    if (!trimmed) break
    dynamic = assemble()
    total = countWords(staticBase) + countWords(dynamic)
  }
  return dynamic
}
