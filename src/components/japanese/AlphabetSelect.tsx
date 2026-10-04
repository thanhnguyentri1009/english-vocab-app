import { useTranslation } from 'react-i18next'
import type { AlphabetSet } from '../../data/japanese/alphabet'
import PageHeader from '../PageHeader'

interface AlphabetSelectProps {
  onSelect: (set: AlphabetSet) => void
}

const SETS: { key: AlphabetSet; mark: string }[] = [
  { key: 'hiragana', mark: 'あいう' },
  { key: 'katakana', mark: 'アイウ' },
  { key: 'kanji', mark: '一二三' },
]

export default function AlphabetSelect({ onSelect }: AlphabetSelectProps) {
  const { t } = useTranslation()
  return (
    <div className="page page-wide">
      <PageHeader eyebrow={t('eyebrow.alphabet')} title={t('japanese.alphabetSelect.title')} subtitle={t('japanese.alphabetSelect.subtitle')} />
      <div className="choice-grid">
        {SETS.map((set) => (
          <button key={set.key} type="button" className="choice" onClick={() => onSelect(set.key)}>
            <span className="choice-glyph" lang="ja" style={{ fontSize: 36 }}>
              {set.mark}
            </span>
            <span className="choice-title">{t(`japanese.alphabetSelect.${set.key}`)}</span>
            <span className="choice-sub">{t(`japanese.alphabetSelect.${set.key}Subtitle`)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
