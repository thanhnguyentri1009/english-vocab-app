export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2'

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'modal verb'
  | 'auxiliary verb'
  | 'adjective'
  | 'adverb'
  | 'preposition'
  | 'conjunction'
  | 'pronoun'
  | 'determiner'
  | 'exclamation'
  | 'number'
  | 'article'

// Follows the style used by the Oxford Learner's Dictionaries.
// Only `vi` (the Vietnamese translation) is not in English.
export interface VocabularyWord {
  en: string
  ipa: string
  pos: PartOfSpeech
  definition: string
  example: string
  vi: string
}

export interface LevelInfo {
  key: CefrLevel
  title: string
  subtitle: string
  color: string
  accent: string
}
