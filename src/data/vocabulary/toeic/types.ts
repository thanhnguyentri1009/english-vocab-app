export type { VocabularyWord as ToeicWord } from '../word'

export type ToeicLevel = '0-250' | '250-450' | '450-600' | '600-780' | '780-900' | '900-990'

export interface ToeicLevelInfo {
  key: ToeicLevel
  title: string
  subtitle: string
  color: string
  accent: string
}
