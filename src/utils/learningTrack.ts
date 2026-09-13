export type LearningTrack = 'english' | 'japanese'

const STORAGE_KEY = 'learning-track'

// Unlike the UI language (which defaults to 'en'), there is no default here —
// the app must ask on first visit.
export function getLearningTrack(): LearningTrack | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'english' || stored === 'japanese') return stored
  } catch {
    // localStorage may be unavailable
  }
  return null
}

export function setLearningTrack(track: LearningTrack) {
  try {
    localStorage.setItem(STORAGE_KEY, track)
  } catch {
    // localStorage may be unavailable — the choice just won't persist
  }
}

export function clearLearningTrack() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // localStorage may be unavailable
  }
}
