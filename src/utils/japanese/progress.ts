import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from '../../firebase'
import type { JlptLevel } from '../../data/japanese/types'

export type JapaneseScreen = 'levelDetail' | 'learn' | 'quiz'

export interface JapaneseSession {
  level: JlptLevel
  screen: JapaneseScreen
  wordIndex: number
}

export interface JapaneseProgressState {
  // Learned word ids, keyed by JLPT level.
  learnedWords: Partial<Record<JlptLevel, string[]>>
  session?: JapaneseSession
  batchSize?: number
  updatedAt?: number
}

const defaultState: JapaneseProgressState = { learnedWords: {} }

// Kept entirely separate from the English track's progress.ts — its own
// localStorage key and its own Firestore collection — so nothing here can
// collide with or corrupt existing English progress data.
function storageKey(code: string) {
  return `jp-vocab-progress-v1:${code}`
}

export function loadJapaneseProgress(code: string): JapaneseProgressState {
  try {
    const raw = localStorage.getItem(storageKey(code))
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as JapaneseProgressState
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

export function saveJapaneseProgress(code: string, state: JapaneseProgressState) {
  try {
    localStorage.setItem(storageKey(code), JSON.stringify(state))
  } catch {
    // localStorage may be unavailable (private browsing, storage disabled) — ignore
  }
}

function progressDocRef(code: string) {
  return doc(db, 'progress-japanese', code)
}

export function subscribeJapaneseRemoteProgress(
  code: string,
  onUpdate: (state: JapaneseProgressState) => void,
): Unsubscribe {
  return onSnapshot(
    progressDocRef(code),
    (snapshot) => {
      const data = snapshot.data()
      if (!data) return
      onUpdate({
        learnedWords: (data.learnedWords as JapaneseProgressState['learnedWords']) ?? {},
        session: (data.session as JapaneseSession | null | undefined) ?? undefined,
        batchSize: (data.batchSize as number | null | undefined) ?? undefined,
        updatedAt: (data.updatedAt as number | undefined) ?? 0,
      })
    },
    () => {
      // offline or blocked — local cache keeps the app usable
    },
  )
}

export function pushJapaneseRemoteProgress(code: string, state: JapaneseProgressState) {
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
