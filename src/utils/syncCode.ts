const CODE_KEY = 'vocab-sync-code'

export function getSyncCode(): string | null {
  try {
    return localStorage.getItem(CODE_KEY)
  } catch {
    return null
  }
}

export function setSyncCode(code: string) {
  try {
    localStorage.setItem(CODE_KEY, code)
  } catch {
    // localStorage may be unavailable (private browsing, storage disabled) — ignore
  }
}

export function clearSyncCode() {
  try {
    localStorage.removeItem(CODE_KEY)
  } catch {
    // ignore
  }
}

// Firestore document IDs can't contain "/" and shouldn't be "." or "..".
export function isValidSyncCode(code: string): boolean {
  const trimmed = code.trim()
  return trimmed.length > 0 && trimmed.length <= 100 && !/[/.]/.test(trimmed)
}
