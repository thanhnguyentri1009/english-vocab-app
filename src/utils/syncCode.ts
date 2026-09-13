import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

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

// A standing demo code (e.g. for interviewers/reviewers trying the app
// without creating anything) — always considered valid; its Firestore doc
// is created lazily on first write, same as account-derived codes.
export const GUEST_CODE = 'guest'

// Access is only granted to codes whose document was created ahead of time
// (manually, in the Firestore console) — this never auto-creates new ones,
// except for GUEST_CODE above. Checked against the English `progress`
// collection since that's the one every account has predated by; shared by
// both tracks since a sync code is chosen before either app renders.
export async function codeExists(code: string): Promise<boolean> {
  if (code.toLowerCase() === GUEST_CODE) return true
  const snapshot = await getDoc(doc(db, 'progress', code))
  return snapshot.exists()
}
