import type { PhrasalVerbContext, PhrasalVerbWord } from './types'
import { BUSINESS_WORK } from './business-work'
import { ACADEMIC_EDUCATION } from './academic-education'
import { DAILY_LIFE } from './daily-life'
import { TRAVEL } from './travel'
import { HEALTH_BODY } from './health-body'
import { EMOTIONS_RELATIONSHIPS } from './emotions-relationships'
import { TECHNOLOGY } from './technology'
import { ENVIRONMENT_SOCIETY } from './environment-society'

export type { PhrasalVerbContext, PhrasalVerbWord, PhrasalVerbContextInfo } from './types'
export { PHRASAL_VERB_LEVELS } from './levels'

export const PHRASAL_VERBS: Record<PhrasalVerbContext, PhrasalVerbWord[]> = {
  'business-work': BUSINESS_WORK,
  'academic-education': ACADEMIC_EDUCATION,
  'daily-life': DAILY_LIFE,
  'travel': TRAVEL,
  'health-body': HEALTH_BODY,
  'emotions-relationships': EMOTIONS_RELATIONSHIPS,
  'technology': TECHNOLOGY,
  'environment-society': ENVIRONMENT_SOCIETY,
}
