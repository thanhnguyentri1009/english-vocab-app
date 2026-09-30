export type HskLevel = 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5' | 'HSK6'

// `meaning` is the English gloss; `vi` is Vietnamese translation; `id` is stable key (e.g. "hsk1-0001")
export interface ChineseWord {
  id: string
  zh: string
  pinyin: string
  meaning: string
  vi: string
}
