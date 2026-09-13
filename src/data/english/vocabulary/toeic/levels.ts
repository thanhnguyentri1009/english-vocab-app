import type { ToeicLevelInfo } from './types'

export const TOEIC_LEVELS: ToeicLevelInfo[] = [
  {
    key: '0-250',
    title: '0-250',
    subtitle: 'Beginner',
    color: '#eaf3ff',
    accent: '#7aa7d9',
  },
  {
    key: '250-450',
    title: '250-450',
    subtitle: 'Elementary',
    color: '#eafff2',
    accent: '#7ad9a3',
  },
  {
    key: '450-600',
    title: '450-600',
    subtitle: 'Intermediate',
    color: '#fff6ea',
    accent: '#d9a97a',
  },
  {
    key: '600-780',
    title: '600-780',
    subtitle: 'Upper-Intermediate',
    color: '#f5eaff',
    accent: '#b17ad9',
  },
  {
    key: '780-900',
    title: '780-900',
    subtitle: 'Advanced',
    color: '#fdeaf0',
    accent: '#d97aa0',
  },
  {
    key: '900-990',
    title: '900-990',
    subtitle: 'Expert',
    color: '#eaf6f5',
    accent: '#4fa89c',
  },
]
