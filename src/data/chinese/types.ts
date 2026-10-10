export type HskLevel = 'STARTER' | 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5' | 'HSK6'

export interface ChineseExample {
  sentence: string
  pinyin: string
  vi: string
  meaning: string
}

// `meaning` is the English gloss; `vi` is Vietnamese translation; `id` is stable key (e.g. "hsk1-0001")
export interface ChineseWord {
  id: string
  zh: string
  pinyin: string
  meaning: string
  vi: string
  example?: ChineseExample
}
