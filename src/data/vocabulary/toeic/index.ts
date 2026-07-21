import type { ToeicLevel, ToeicWord } from './types'
import { TOEIC_0_250 } from './toeic0-250'
import { TOEIC_250_450 } from './toeic250-450'
import { TOEIC_450_600 } from './toeic450-600'
import { TOEIC_600_780 } from './toeic600-780'
import { TOEIC_780_900 } from './toeic780-900'
import { TOEIC_900_990 } from './toeic900-990'

export type { ToeicLevel, ToeicWord, ToeicLevelInfo } from './types'
export { TOEIC_LEVELS } from './levels'

export const TOEIC: Record<ToeicLevel, ToeicWord[]> = {
  '0-250': TOEIC_0_250,
  '250-450': TOEIC_250_450,
  '450-600': TOEIC_450_600,
  '600-780': TOEIC_600_780,
  '780-900': TOEIC_780_900,
  '900-990': TOEIC_900_990,
}
