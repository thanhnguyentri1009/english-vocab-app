export type { PartOfSpeech, VocabularyWord } from '../word'
export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export interface LevelInfo {
  key: CefrLevel
  title: string
  subtitle: string
  color: string
  accent: string
}
