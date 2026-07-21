import { doc, onSnapshot, serverTimestamp, setDoc, type Unsubscribe } from 'firebase/firestore'
import { db } from '../firebase'
import type { CefrLevel } from '../data/vocabulary'

export type Screen = 'levelDetail' | 'learn' | 'quiz'

export interface Session {
  level: CefrLevel
  screen: Screen
  batchIndex: number
  wordIndex: number
}

export interface ProgressState {
  learnedWords: Partial<Record<CefrLevel, string[]>>
  session?: Session
}

const STORAGE_KEY = 'vocab-progress-v1'

// Fixed sync code shared across devices — anyone who opens this app syncs
// to the same Firestore document. No login, so treat it as a shared diary.
const SYNC_CODE = 'thanh'

const defaultState: ProgressState = { learnedWords: {} }

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as ProgressState
    return { learnedWords: parsed.learnedWords ?? {}, session: parsed.session }
  } catch {
    return defaultState
  }
}

export function saveProgress(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage may be unavailable (private browsing, storage disabled) — ignore
  }
}

function progressDocRef() {
  return doc(db, 'progress', SYNC_CODE)
}

export function subscribeRemoteProgress(
  onUpdate: (state: ProgressState) => void,
): Unsubscribe {
  return onSnapshot(
    progressDocRef(),
    (snapshot) => {
      const data = snapshot.data()
      if (!data) return
      onUpdate({
        learnedWords: (data.learnedWords as ProgressState['learnedWords']) ?? {},
        session: (data.session as Session | null | undefined) ?? undefined,
      })
    },
    () => {
      // offline or blocked — local cache keeps the app usable
    },
  )
}

export function pushRemoteProgress(state: ProgressState) {
  // Firestore rejects `undefined` field values — use `null` instead.
  setDoc(progressDocRef(), {
    learnedWords: state.learnedWords,
    session: state.session ?? null,
    updatedAt: serverTimestamp(),
  }).catch(() => {
    // offline — local cache already has the data, will sync on the next change
  })
}
