import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from '../firebase'

export interface StageRecord {
  // Ids answered correctly the very first time they were shown this run —
  // this is the "score" used for grading (badges, tier colors, review modal).
  correctIds: string[]
  // Ids answered correctly at least once (on a first try or a retry) — once
  // an id is here it leaves the retry queue for good. A stage is complete
  // when every question in it is mastered.
  masteredIds: string[]
  // Ids that have been answered wrong at least once, so a later correct
  // answer on retry isn't mistaken for a first try.
  wrongOnceIds: string[]
  completed: boolean
}

export interface CategoryProgress {
  stages: Record<number, StageRecord>
}

export interface ExerciseProgressState {
  categories: Partial<Record<string, CategoryProgress>>
  updatedAt?: number
}

const defaultState: ExerciseProgressState = { categories: {} }

function storageKey(code: string) {
  return `exercise-progress-v1:${code}`
}

// Pre-sync-code storage key, shared globally across every device — migrated
// into the code-scoped key below on first load so existing local progress
// isn't lost when this feature moved to Firestore.
const LEGACY_STORAGE_KEY = 'exercise-stage-progress'

export function loadExerciseProgress(code: string): ExerciseProgressState {
  try {
    const raw = localStorage.getItem(storageKey(code))
    if (raw) {
      const parsed = JSON.parse(raw) as ExerciseProgressState
      return { categories: parsed.categories ?? {}, updatedAt: parsed.updatedAt }
    }
    const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY)
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw) as ExerciseProgressState['categories']
      return { categories: legacy ?? {} }
    }
    return defaultState
  } catch {
    return defaultState
  }
}

export function saveExerciseProgress(code: string, state: ExerciseProgressState) {
  try {
    localStorage.setItem(storageKey(code), JSON.stringify(state))
  } catch {
    // localStorage may be unavailable (private browsing, storage disabled) — ignore
  }
}

function exerciseProgressDocRef(code: string) {
  return doc(db, 'exerciseProgress', code)
}

export function subscribeRemoteExerciseProgress(
  code: string,
  onUpdate: (state: ExerciseProgressState) => void,
): Unsubscribe {
  return onSnapshot(
    exerciseProgressDocRef(code),
    (snapshot) => {
      const data = snapshot.data()
      if (!data) return
      onUpdate({
        categories: (data.categories as ExerciseProgressState['categories']) ?? {},
        updatedAt: (data.updatedAt as number | undefined) ?? 0,
      })
    },
    () => {
      // offline or blocked — local cache keeps the app usable
    },
  )
}

export function pushRemoteExerciseProgress(code: string, state: ExerciseProgressState) {
  // Firestore rejects `undefined` field values — use `null` instead.
  setDoc(exerciseProgressDocRef(code), {
    categories: state.categories,
    updatedAt: state.updatedAt ?? Date.now(),
    serverUpdatedAt: serverTimestamp(),
  }).catch(() => {
    // offline — local cache already has the data, will sync on the next change
  })
}
