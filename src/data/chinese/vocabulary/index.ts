import type { ChineseWord, HskLevel } from '../types'
import { STARTER } from './starter'
import { HSK1 } from './hsk1'
import { HSK2 } from './hsk2'
import { HSK3 } from './hsk3'
import { HSK4 } from './hsk4'
import { HSK5 } from './hsk5'
import { HSK6 } from './hsk6'

export const CHINESE_VOCABULARY: Record<HskLevel, ChineseWord[]> = {
  STARTER,
  HSK1,
  HSK2,
  HSK3,
  HSK4,
  HSK5,
  HSK6,
}
