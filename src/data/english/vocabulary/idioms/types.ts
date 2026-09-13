export type { VocabularyWord as IdiomWord } from '../word'

export type IdiomTheme =
  | 'emotions-feelings'
  | 'money-business'
  | 'time'
  | 'success-failure'
  | 'relationships-people'
  | 'communication-advice'
  | 'weather-nature'
  | 'food-everyday-life'

export interface IdiomThemeInfo {
  key: IdiomTheme
  title: string
  subtitle: string
  color: string
  accent: string
}
