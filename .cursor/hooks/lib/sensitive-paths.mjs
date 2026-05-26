/**
 * Shared rules for secret/sensitive paths.
 * Used by beforeReadFile and preToolUse (mutating file tools).
 */

/** @param {string} path */
export function lastSegment(path) {
  if (!path || typeof path !== 'string') return ''
  const n = path.replace(/\\/g, '/')
  return n.split('/').pop() || ''
}

/** @param {string} path */
export function isBlockedSecretPath(path) {
  const base = lastSegment(path)
  if (!base) return false

  const lower = base.toLowerCase()
  const norm = path.replace(/\\/g, '/').toLowerCase()

  if (/\.(pem|p12|pfx)$/i.test(base)) return true
  if (/^id_(rsa|ed25519|ecdsa)(\.pub)?$/i.test(base)) return true
  if (/\/(certs|secrets|ssl|private|\.ssh)\/[^/]+\.key$/i.test(norm)) return true

  if (lower === '.env' || lower.startsWith('.env.')) {
    const safeSuffix = /(\.|^)(example|sample|template|dist|ci|test\.example)$/i
    if (safeSuffix.test(lower)) return false
    return true
  }

  if (/^(firebase-adminsdk|google-services|serviceaccount)\./i.test(base)) return true
  if (/^\.?(aws|gcp|azure)[-_]?credentials\.json$/i.test(base)) return true

  return false
}

/** @param {unknown} obj @param {Set<string>} out */
export function collectPathStrings(obj, out = new Set()) {
  if (obj == null) return out
  if (typeof obj === 'string') {
    if (obj.includes('/') || obj.includes('\\') || obj.startsWith('.')) {
      out.add(obj)
    }
    return out
  }
  if (Array.isArray(obj)) {
    for (const x of obj) collectPathStrings(x, out)
    return out
  }
  if (typeof obj === 'object') {
    const preferKeys = [
      'file_path',
      'path',
      'target_file',
      'targetFile',
      'filePath',
      'relative_workspace_path',
      'relativeWorkspacePath',
      'file',
      'filename',
      'old_path',
      'new_path',
    ]
    for (const k of preferKeys) {
      if (k in obj && typeof obj[k] === 'string') out.add(obj[k])
    }
    for (const v of Object.values(obj)) collectPathStrings(v, out)
  }
  return out
}
