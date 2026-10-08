import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from '../../firebase'
import type { HskLevel } from '../../data/chinese/types'

export type ChineseScreen = 'levelDetail' | 'learn' | 'quiz'

export interface ChineseSession {
  level: HskLevel
  screen: ChineseScreen
  wordIndex: number
}

export interface ChineseProgressState {
  // Learned word ids, keyed by HSK level.
  learnedWords: Partial<Record<HskLevel, string[]>>
  session?: ChineseSession
  batchSize?: number
  updatedAt?: number
}

const defaultState: ChineseProgressState = { learnedWords: {} }

function storageKey(code: string) {
  return `zh-vocab-progress-v1:${code}`
}

export function loadChineseProgress(code: string): ChineseProgressState {
  try {
    const raw = localStorage.getItem(storageKey(code))
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as ChineseProgressState
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

export function saveChineseProgress(code: string, state: ChineseProgressState) {
  try {
    localStorage.setItem(storageKey(code), JSON.stringify(state))
  } catch {
    // localStorage may be unavailable (private browsing, storage disabled) — ignore
  }
}

function progressDocRef(code: string) {
  return doc(db, 'progress', code)
}

function parseChineseState(data: Record<string, unknown>): ChineseProgressState {
  return {
    learnedWords: (data.learnedWords as ChineseProgressState['learnedWords']) ?? {},
    session: (data.session as ChineseSession | null | undefined) ?? undefined,
    batchSize: (data.batchSize as number | null | undefined) ?? undefined,
    updatedAt: (data.updatedAt as number | undefined) ?? 0,
  }
}

export function subscribeChineseRemoteProgress(
  code: string,
  onUpdate: (state: ChineseProgressState) => void,
): Unsubscribe {
  return onSnapshot(
    progressDocRef(code),
    (snapshot) => {
      const raw = snapshot.data()
      const nested = (raw?.chinese ?? null) as Record<string, unknown> | null

      if (nested) {
        onUpdate(parseChineseState(nested))
        return
      }

      // Signal connectivity so the app can push local progress if needed.
      onUpdate({ learnedWords: {} })

      // Migrate from old progress-chinese collection (one-time, fires only
      // while the new progress/{code}.chinese field does not exist yet).
      getDoc(doc(db, 'progress-chinese', code))
        .then((oldSnap) => {
          if (!oldSnap.exists()) return
          const migrated = parseChineseState(oldSnap.data() as Record<string, unknown>)
          setDoc(
            progressDocRef(code),
            { chinese: { ...migrated, serverUpdatedAt: serverTimestamp() } },
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

export function pushChineseRemoteProgress(code: string, state: ChineseProgressState) {
  setDoc(
    progressDocRef(code),
    {
      chinese: {
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
