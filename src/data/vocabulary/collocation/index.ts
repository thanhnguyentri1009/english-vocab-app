import type { CollocationContext, CollocationWord } from './types'
import { BUSINESS_WORK } from './business-work'
import { ACADEMIC_EDUCATION } from './academic-education'
import { DAILY_LIFE } from './daily-life'
import { TRAVEL } from './travel'
import { HEALTH_BODY } from './health-body'
import { EMOTIONS_RELATIONSHIPS } from './emotions-relationships'
import { TECHNOLOGY } from './technology'
import { ENVIRONMENT_SOCIETY } from './environment-society'

export type { CollocationContext, CollocationWord, CollocationContextInfo } from './types'
export { COLLOCATION_LEVELS } from './levels'

export const COLLOCATION: Record<CollocationContext, CollocationWord[]> = {
  'business-work': BUSINESS_WORK,
  'academic-education': ACADEMIC_EDUCATION,
  'daily-life': DAILY_LIFE,
  'travel': TRAVEL,
  'health-body': HEALTH_BODY,
  'emotions-relationships': EMOTIONS_RELATIONSHIPS,
  'technology': TECHNOLOGY,
  'environment-society': ENVIRONMENT_SOCIETY,
}
