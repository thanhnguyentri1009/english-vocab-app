import {
  doc,
  getDoc,
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
  return doc(db, 'progress', code)
}

function parseJapaneseState(data: Record<string, unknown>): JapaneseProgressState {
  return {
    learnedWords: (data.learnedWords as JapaneseProgressState['learnedWords']) ?? {},
    session: (data.session as JapaneseSession | null | undefined) ?? undefined,
    batchSize: (data.batchSize as number | null | undefined) ?? undefined,
    updatedAt: (data.updatedAt as number | undefined) ?? 0,
  }
}

export function subscribeJapaneseRemoteProgress(
  code: string,
  onUpdate: (state: JapaneseProgressState) => void,
): Unsubscribe {
  return onSnapshot(
    progressDocRef(code),
    (snapshot) => {
      const raw = snapshot.data()
      const nested = (raw?.japanese ?? null) as Record<string, unknown> | null

      if (nested) {
        onUpdate(parseJapaneseState(nested))
        return
      }

      // Signal connectivity so the app can push local progress if needed.
      onUpdate({ learnedWords: {} })

      // Migrate from old progress-japanese collection (one-time, fires only
      // while the new progress/{code}.japanese field does not exist yet).
      getDoc(doc(db, 'progress-japanese', code))
        .then((oldSnap) => {
          if (!oldSnap.exists()) return
          const migrated = parseJapaneseState(oldSnap.data() as Record<string, unknown>)
          setDoc(
            progressDocRef(code),
            { japanese: { ...migrated, serverUpdatedAt: serverTimestamp() } },
            { merge: true },
          ).catch(() => {})
        })
        .catch(() => {})
    },
    () => {
      // offline or blocked — local cache keeps the app usable
    },
  )
}

export function pushJapaneseRemoteProgress(code: string, state: JapaneseProgressState) {
  setDoc(
    progressDocRef(code),
    {
      japanese: {
        learnedWords: state.learnedWords,
        session: state.session ?? null,
        batchSize: state.batchSize ?? null,
        updatedAt: state.updatedAt ?? Date.now(),
        serverUpdatedAt: serverTimestamp(),
      },
    },
    { merge: true },
  ).catch(() => {
    // offline — local cache already has the data, will sync on the next change
  })
}
