import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from '../firebase'
import type { Topic } from '../data/vocabulary'

export type Screen = 'levelDetail' | 'learn' | 'quiz'

export interface Session {
  // Absent on sessions saved before topics existed — those all predate
  // anything but Oxford, so callers fall back to 'oxford'.
  topic?: Topic
  level: string
  screen: Screen
  // Position within the current batch of not-yet-learned words (the batch
  // itself is derived from learnedWords + batchSize, not stored here).
  wordIndex: number
}

export interface ProgressState {
  learnedWords: Partial<Record<string, string[]>>
  session?: Session
  // How many new words to show per learning round (e.g. 3, 6, or 10).
  batchSize?: number
  // Client clock timestamp of the last local change — used to resolve
  // conflicts between the local cache and Firestore (last write wins).
  updatedAt?: number
}

const defaultState: ProgressState = { learnedWords: {} }

function storageKey(code: string) {
  return `vocab-progress-v1:${code}`
}

export function loadProgress(code: string): ProgressState {
  try {
    const raw = localStorage.getItem(storageKey(code))
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as ProgressState
    return {
      learnedWords: parsed.learnedWords ?? {},
      session: parsed.session,
      batchSize: parsed.batchSize,
      updatedAt: parsed.updatedAt,
    }
  } catch {
    return defaultState
  }
}

export function saveProgress(code: string, state: ProgressState) {
  try {
    localStorage.setItem(storageKey(code), JSON.stringify(state))
  } catch {
    // localStorage may be unavailable (private browsing, storage disabled) — ignore
  }
}

function progressDocRef(code: string) {
  return doc(db, 'progress', code)
}

// Access is only granted to codes whose document was created ahead of time
// (manually, in the Firestore console) — this never auto-creates new ones.
export async function codeExists(code: string): Promise<boolean> {
  const snapshot = await getDoc(progressDocRef(code))
  return snapshot.exists()
}

export function subscribeRemoteProgress(
  code: string,
  onUpdate: (state: ProgressState) => void,
): Unsubscribe {
  return onSnapshot(
    progressDocRef(code),
    (snapshot) => {
      const data = snapshot.data()
      if (!data) return
      onUpdate({
        learnedWords: (data.learnedWords as ProgressState['learnedWords']) ?? {},
        session: (data.session as Session | null | undefined) ?? undefined,
        batchSize: (data.batchSize as number | null | undefined) ?? undefined,
        updatedAt: (data.updatedAt as number | undefined) ?? 0,
      })
    },
    () => {
      // offline or blocked — local cache keeps the app usable
    },
  )
}

export function pushRemoteProgress(code: string, state: ProgressState) {
  // Firestore rejects `undefined` field values — use `null` instead.
  setDoc(progressDocRef(code), {
    learnedWords: state.learnedWords,
    session: state.session ?? null,
    batchSize: state.batchSize ?? null,
    updatedAt: state.updatedAt ?? Date.now(),
    serverUpdatedAt: serverTimestamp(),
  }).catch(() => {
    // offline — local cache already has the data, will sync on the next change
  })
}
