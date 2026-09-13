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
