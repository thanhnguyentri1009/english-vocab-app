export type { VocabularyWord as PhrasalVerbWord } from '../word'

export type PhrasalVerbContext =
  | 'business-work'
  | 'academic-education'
  | 'daily-life'
  | 'travel'
  | 'health-body'
  | 'emotions-relationships'
  | 'technology'
  | 'environment-society'

export interface PhrasalVerbContextInfo {
  key: PhrasalVerbContext
  title: string
  subtitle: string
  color: string
  accent: string
}
