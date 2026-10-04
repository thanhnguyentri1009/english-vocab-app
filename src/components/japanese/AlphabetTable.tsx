import { Typography } from 'antd'
import PageHeader from '../PageHeader'
import { useTranslation } from 'react-i18next'
import { HIRAGANA, KATAKANA, KANJI, type AlphabetSet, type KanaGroup } from '../../data/japanese/alphabet'
import { kanaSpeechText, kanjiReadingSpeechText, speak } from '../../utils/speech'

const { Text } = Typography

interface AlphabetTableProps {
  set: AlphabetSet
  onBack: () => void
}

const KANA_GROUPS: KanaGroup[] = ['basic', 'dakuten', 'handakuten', 'yoon']

// Each kana group is made up of consecutive "rows" (a/i/u/e/o style), always
// in the same fixed order the data files declare them in. Chunking by these
// sizes groups characters the way learners actually study them (a, ka, sa...)
// instead of an arbitrary number of characters per line.
const ROW_SIZES: Record<KanaGroup, number[]> = {
  basic: [5, 5, 5, 5, 5, 5, 5, 3, 5, 3],
  dakuten: [5, 5, 5, 5],
  handakuten: [5],
  yoon: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
}

function chunkIntoRows<T>(items: T[], group: KanaGroup): T[][] {
  const sizes = ROW_SIZES[group]
  const rows: T[][] = []
  let offset = 0
  for (const size of sizes) {
    rows.push(items.slice(offset, offset + size))
    offset += size
  }
  if (offset < items.length) rows.push(items.slice(offset))
  return rows.filter((row) => row.length > 0)
}

function ReadingChips({ label, readings }: { label: string; readings: string[] }) {
  if (readings.length === 0) return null
  return (
    <div className="kanji-readings">
      <span className="kanji-readings-label">{label}</span>
      {readings.map((r) => (
        <button
          key={r}
          type="button"
          className="reading-chip"
          onClick={() => speak(kanjiReadingSpeechText(r), 'ja-JP')}
        >
          {r}
        </button>
      ))}
    </div>
  )
}

export default function AlphabetTable({ set, onBack }: AlphabetTableProps) {
  const { t } = useTranslation()

  return (
    <div className="page">
      <PageHeader
        eyebrow={t('eyebrow.alphabet')}
        title={t(`japanese.alphabetSelect.${set}`)}
        subtitle={t('japanese.alphabetTable.tapToListen')}
        backLabel={t('japanese.alphabetTable.back')}
        onBack={onBack}
      />

      {set === 'kanji' ? (
        <div className="list">
          {KANJI.map((k) => (
            <div key={k.char} className="kanji-row">
              <button
                type="button"
                className="kanji-char"
                onClick={() => speak(kanjiReadingSpeechText(k.kunYomi[0] ?? k.onYomi[0] ?? k.char), 'ja-JP')}
                aria-label={k.char}
              >
                {k.char}
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span className="list-title">{k.meanings.join(', ')}</span>
                <ReadingChips label={t('japanese.alphabetTable.onyomi')} readings={k.onYomi} />
                <ReadingChips label={t('japanese.alphabetTable.kunyomi')} readings={k.kunYomi} />
                <span className="list-sub">{t('japanese.alphabetTable.strokes', { count: k.strokeCount })}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        KANA_GROUPS.map((group) => {
          const chars = (set === 'hiragana' ? HIRAGANA : KATAKANA).filter((c) => c.group === group)
          if (chars.length === 0) return null
          const rows = chunkIntoRows(chars, group)
          return (
            <section key={group} style={{ marginBottom: 24 }}>
              <Text strong style={{ display: 'block', marginBottom: 8 }}>
                {t(`japanese.alphabetTable.group.${group}`)}
              </Text>
              <div className="tile-groups">
                {rows.map((row) => (
                  <div
                    key={row[0].char}
                    className="tile-grid"
                    style={{ gridTemplateColumns: `repeat(${group === 'yoon' ? 3 : 5}, minmax(0, 1fr))` }}
                  >
                    {row.map((c) => (
                      <button
                        key={c.char}
                        type="button"
                        className="tile"
                        onClick={() => speak(kanaSpeechText(c.char), 'ja-JP')}
                      >
                        <span className="tile-main" lang="ja">
                          {c.char}
                        </span>
                        <span className="tile-sub">{c.romaji}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          )
        })
      )}
    </div>
  )
}
