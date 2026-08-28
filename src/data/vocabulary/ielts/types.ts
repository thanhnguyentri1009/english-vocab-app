export type { VocabularyWord as IeltsWord } from '../word'

export type IeltsLevel =
  | '0-4.0'
  | '4.0-4.5'
  | '5.0-5.5'
  | '5.5-6.0'
  | '6.0-6.5'
  | '6.5-7.0'
  | '7.0+'

export interface IeltsLevelInfo {
  key: IeltsLevel
  title: string
  subtitle: string
  color: string
  accent: string
}
