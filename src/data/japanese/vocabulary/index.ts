import type { JapaneseWord, JlptLevel } from '../types'
import { N5 } from './n5'
import { N4 } from './n4'
import { N3 } from './n3'
import { N2 } from './n2'
import { N1 } from './n1'

export const JAPANESE_VOCABULARY: Record<JlptLevel, JapaneseWord[]> = {
  N5: N5,
  N4: N4,
  N3: N3,
  N2: N2,
  N1: N1,
}
