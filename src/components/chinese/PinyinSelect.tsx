import { useTranslation } from 'react-i18next'
import PageHeader from '../PageHeader'

export type PinyinSet = 'initials' | 'finals' | 'tones'

interface PinyinSelectProps {
  onSelect: (set: PinyinSet) => void
}

const SETS: { key: PinyinSet; mark: string }[] = [
  { key: 'initials', mark: 'b p m f' },
  { key: 'finals', mark: 'a o e i u ü' },
  { key: 'tones', mark: 'ā á ǎ à' },
]

export default function PinyinSelect({ onSelect }: PinyinSelectProps) {
  const { t } = useTranslation()
  return (
    <div className="page page-wide">
      <PageHeader eyebrow={t('eyebrow.pinyin')} title={t('chinese.pinyinSelect.title')} subtitle={t('chinese.pinyinSelect.subtitle')} />
      <div className="choice-grid">
        {SETS.map((set) => (
          <button key={set.key} type="button" className="choice" onClick={() => onSelect(set.key)}>
            <span className="choice-glyph" style={{ fontSize: 32 }}>
              {set.mark}
            </span>
            <span className="choice-title">{t(`chinese.pinyinSelect.${set.key}`)}</span>
            <span className="choice-sub">{t(`chinese.pinyinSelect.${set.key}Subtitle`)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
