const CODE_KEY = 'vocab-sync-code'
// Optional friendly label (e.g. an account's email) shown instead of the
// raw sync code when the code was derived from a signed-in account.
const LABEL_KEY = 'vocab-sync-label'

export function getSyncCode(): string | null {
  try {
    return localStorage.getItem(CODE_KEY)
  } catch {
    return null
  }
}

export function setSyncCode(code: string, label?: string) {
  try {
    localStorage.setItem(CODE_KEY, code)
    if (label) localStorage.setItem(LABEL_KEY, label)
    else localStorage.removeItem(LABEL_KEY)
  } catch {
    // localStorage may be unavailable (private browsing, storage disabled) — ignore
  }
}

export function getSyncLabel(): string | null {
  try {
    return localStorage.getItem(LABEL_KEY)
  } catch {
    return null
  }
}

export function clearSyncCode() {
  try {
    localStorage.removeItem(CODE_KEY)
    localStorage.removeItem(LABEL_KEY)
  } catch {
    // ignore
  }
}

// Firestore document IDs can't contain "/" and shouldn't be "." or "..".
export function isValidSyncCode(code: string): boolean {
  const trimmed = code.trim()
  return trimmed.length > 0 && trimmed.length <= 100 && !/[/.]/.test(trimmed)
}
