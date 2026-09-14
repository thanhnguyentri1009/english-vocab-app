export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1'

// `meaning` is the English gloss from the JLPT source dataset; `vi` is a
// Vietnamese translation added on top of it. `id` is a stable generated key
// (e.g. "n5-0042"), used instead of `jp` for progress/quiz identity since
// expressions aren't guaranteed unique the way English headwords are.
export interface JapaneseWord {
  id: string
  jp: string
  reading: string
  romaji: string
  meaning: string
  vi: string
}
