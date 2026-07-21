import type { VocabularyWord } from './word'

export type { VocabularyWord } from './word'
import { LEVELS as OXFORD_LEVELS, VOCABULARY as OXFORD_VOCABULARY } from './oxford'
import { TOEIC_LEVELS, TOEIC } from './toeic'
import { IELTS_LEVELS, IELTS } from './ielts'

export type Topic = 'oxford' | 'toeic' | 'ielts'

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
    color: '#eaf3ff',
    accent: '#7aa7d9',
  },
  {
    key: 'toeic',
    title: 'TOEIC',
    subtitle: 'Vocabulary by TOEIC score band',
    color: '#fff6ea',
    accent: '#d9a97a',
  },
  {
    key: 'ielts',
    title: 'IELTS',
    subtitle: 'Vocabulary by IELTS band score',
    color: '#fdeaf0',
    accent: '#d97aa0',
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
