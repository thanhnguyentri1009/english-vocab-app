export type { VocabularyWord as CollocationWord } from '../word'

export type CollocationContext =
  | 'business-work'
  | 'academic-education'
  | 'daily-life'
  | 'travel'
  | 'health-body'
  | 'emotions-relationships'
  | 'technology'
  | 'environment-society'

export interface CollocationContextInfo {
  key: CollocationContext
  title: string
  subtitle: string
  color: string
  accent: string
}
