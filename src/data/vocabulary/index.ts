import type { CefrLevel, VocabularyWord } from './types'
import { A1 } from './a1'
import { A2 } from './a2'
import { B1 } from './b1'
import { B2 } from './b2'
import { C1 } from './c1'
import { C2 } from './c2'

export type { CefrLevel, VocabularyWord, PartOfSpeech, LevelInfo } from './types'
export { LEVELS } from './levels'

export const VOCABULARY: Record<CefrLevel, VocabularyWord[]> = {
  A1,
  A2,
  B1,
  B2,
  C1,
  C2,
}
