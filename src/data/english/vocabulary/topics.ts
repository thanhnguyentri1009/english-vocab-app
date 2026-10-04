import type { VocabularyWord } from './word'

export type { VocabularyWord } from './word'
import { LEVELS as OXFORD_LEVELS, VOCABULARY as OXFORD_VOCABULARY } from './oxford'
import { TOEIC_LEVELS, TOEIC } from './toeic'
import { IELTS_LEVELS, IELTS } from './ielts'
import { COLLOCATION_LEVELS, COLLOCATION } from './collocation'
import { PHRASAL_VERB_LEVELS, PHRASAL_VERBS } from './phrasal-verbs'
import { IDIOM_LEVELS, IDIOMS } from './idioms'

export type Topic = 'oxford' | 'toeic' | 'ielts' | 'collocation' | 'phrasal-verbs' | 'idioms'

export interface TopicInfo {
  key: Topic
  title: string
  subtitle: string
  color: string
  accent: string
}

export const TOPICS: TopicInfo[] = [
  {
    key: 'oxford',
    title: 'Oxford',
    subtitle: "Oxford Learner's word lists",
    color: '#ffffff',
    accent: '#2c4d86',
  },
  {
    key: 'toeic',
    title: 'TOEIC',
    subtitle: 'Vocabulary by TOEIC score band',
    color: '#ffffff',
    accent: '#2c4d86',
  },
  {
    key: 'ielts',
    title: 'IELTS',
    subtitle: 'Vocabulary by IELTS band score',
    color: '#ffffff',
    accent: '#2c4d86',
  },
  {
    key: 'collocation',
    title: 'Collocation',
    subtitle: 'Common word pairs by context',
    color: '#ffffff',
    accent: '#2c4d86',
  },
  {
    key: 'phrasal-verbs',
    title: 'Phrasal Verbs',
    subtitle: 'Verb + particle by context',
    color: '#ffffff',
    accent: '#2c4d86',
  },
  {
    key: 'idioms',
    title: 'Idioms',
    subtitle: 'Common expressions by theme',
    color: '#ffffff',
    accent: '#2c4d86',
  },
]

export interface LevelInfo {
  key: string
  title: string
  subtitle: string
  color: string
  accent: string
}

export function getLevelsForTopic(topic: Topic): LevelInfo[] {
  switch (topic) {
    case 'oxford':
      return OXFORD_LEVELS
    case 'toeic':
      return TOEIC_LEVELS
    case 'ielts':
      return IELTS_LEVELS
    case 'collocation':
      return COLLOCATION_LEVELS
    case 'phrasal-verbs':
      return PHRASAL_VERB_LEVELS
    case 'idioms':
      return IDIOM_LEVELS
  }
}

export function getVocabularyForTopic(topic: Topic): Record<string, VocabularyWord[]> {
  switch (topic) {
    case 'oxford':
      return OXFORD_VOCABULARY
    case 'toeic':
      return TOEIC
    case 'ielts':
      return IELTS
    case 'collocation':
      return COLLOCATION
    case 'phrasal-verbs':
      return PHRASAL_VERBS
    case 'idioms':
      return IDIOMS
  }
}

// Existing Firestore sessions predate the `topic` field and only ever
// reference Oxford levels — this lets old sessions keep resuming correctly.
export function findTopicForLevel(levelKey: string): Topic | null {
  for (const topic of TOPICS.map((t) => t.key)) {
    if (getLevelsForTopic(topic).some((l) => l.key === levelKey)) return topic
  }
  return null
}
