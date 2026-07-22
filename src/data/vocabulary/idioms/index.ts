import type { IdiomTheme, IdiomWord } from './types'
import { EMOTIONS_FEELINGS } from './emotions-feelings'
import { MONEY_BUSINESS } from './money-business'
import { TIME } from './time'
import { SUCCESS_FAILURE } from './success-failure'
import { RELATIONSHIPS_PEOPLE } from './relationships-people'
import { COMMUNICATION_ADVICE } from './communication-advice'
import { WEATHER_NATURE } from './weather-nature'
import { FOOD_EVERYDAY_LIFE } from './food-everyday-life'

export type { IdiomTheme, IdiomWord, IdiomThemeInfo } from './types'
export { IDIOM_LEVELS } from './levels'

export const IDIOMS: Record<IdiomTheme, IdiomWord[]> = {
  'emotions-feelings': EMOTIONS_FEELINGS,
  'money-business': MONEY_BUSINESS,
  'time': TIME,
  'success-failure': SUCCESS_FAILURE,
  'relationships-people': RELATIONSHIPS_PEOPLE,
  'communication-advice': COMMUNICATION_ADVICE,
  'weather-nature': WEATHER_NATURE,
  'food-everyday-life': FOOD_EVERYDAY_LIFE,
}
