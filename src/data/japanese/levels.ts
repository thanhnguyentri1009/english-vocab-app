import type { LevelInfo } from '../english/vocabulary/topics'

// Same LevelInfo shape the English topics use (key/title/subtitle/color/accent).
export const JAPANESE_LEVELS: LevelInfo[] = [
  {
    key: 'N5',
    title: 'N5',
    subtitle: 'Beginner',
    color: '#eaf3ff',
    accent: '#7aa7d9',
  },
  {
    key: 'N4',
    title: 'N4',
    subtitle: 'Elementary',
    color: '#eafff2',
    accent: '#7ad9a3',
  },
  {
    key: 'N3',
    title: 'N3',
    subtitle: 'Intermediate',
    color: '#fff6ea',
    accent: '#d9a97a',
  },
  {
    key: 'N2',
    title: 'N2',
    subtitle: 'Upper-Intermediate',
    color: '#f5eaff',
    accent: '#b17ad9',
  },
  {
    key: 'N1',
    title: 'N1',
    subtitle: 'Advanced',
    color: '#fdeaf0',
    accent: '#d97aa0',
  },
]
