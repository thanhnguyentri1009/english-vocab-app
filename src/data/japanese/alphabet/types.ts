export type KanaGroup = 'basic' | 'dakuten' | 'handakuten' | 'yoon'

export interface KanaChar {
  char: string
  romaji: string
  group: KanaGroup
}

export interface KanjiChar {
  char: string
  meanings: string[]
  onYomi: string[]
  kunYomi: string[]
  strokeCount: number
}
