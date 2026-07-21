import type { IeltsLevel, IeltsWord } from './types'
import { IELTS_0_4_0 } from './ielts0-4.0'
import { IELTS_4_0_4_5 } from './ielts4.0-4.5'
import { IELTS_5_0_5_5 } from './ielts5.0-5.5'
import { IELTS_5_5_6_0 } from './ielts5.5-6.0'
import { IELTS_6_0_6_5 } from './ielts6.0-6.5'
import { IELTS_6_5_7_0 } from './ielts6.5-7.0'
import { IELTS_7_0_PLUS } from './ielts7.0+'

export type { IeltsLevel, IeltsWord, IeltsLevelInfo } from './types'
export { IELTS_LEVELS } from './levels'

export const IELTS: Record<IeltsLevel, IeltsWord[]> = {
  '0-4.0': IELTS_0_4_0,
  '4.0-4.5': IELTS_4_0_4_5,
  '5.0-5.5': IELTS_5_0_5_5,
  '5.5-6.0': IELTS_5_5_6_0,
  '6.0-6.5': IELTS_6_0_6_5,
  '6.5-7.0': IELTS_6_5_7_0,
  '7.0+': IELTS_7_0_PLUS,
}
