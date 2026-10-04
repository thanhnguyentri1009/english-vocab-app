
import PageHeader from '../PageHeader'
import { useTranslation } from 'react-i18next'
import type { PinyinSet } from './PinyinSelect'
import { speak } from '../../utils/speech'


// A Chinese voice can't read Latin pinyin ("ba", "ang"), it spells the
// letters. Each sound is therefore voiced through a character whose
// standard reading is exactly that syllable, and the syllable is shown on
// the card so learners know what they are hearing.
interface Sound {
  label: string
  char: string
  syllable: string
}

// Initials are taught with their conventional carrier vowel (bō, pō, mō…).
const INITIALS: Sound[][] = [
  [
    { label: 'b', char: '玻', syllable: 'bō' },
    { label: 'p', char: '坡', syllable: 'pō' },
    { label: 'm', char: '摸', syllable: 'mō' },
    { label: 'f', char: '佛', syllable: 'fó' },
  ],
  [
    { label: 'd', char: '德', syllable: 'dé' },
    { label: 't', char: '特', syllable: 'tè' },
    { label: 'n', char: '讷', syllable: 'nè' },
    { label: 'l', char: '勒', syllable: 'lè' },
  ],
  [
    { label: 'g', char: '哥', syllable: 'gē' },
    { label: 'k', char: '科', syllable: 'kē' },
    { label: 'h', char: '喝', syllable: 'hē' },
  ],
  [
    { label: 'j', char: '鸡', syllable: 'jī' },
    { label: 'q', char: '七', syllable: 'qī' },
    { label: 'x', char: '西', syllable: 'xī' },
  ],
  [
    { label: 'zh', char: '知', syllable: 'zhī' },
    { label: 'ch', char: '吃', syllable: 'chī' },
    { label: 'sh', char: '诗', syllable: 'shī' },
    { label: 'r', char: '日', syllable: 'rì' },
  ],
  [
    { label: 'z', char: '资', syllable: 'zī' },
    { label: 'c', char: '词', syllable: 'cí' },
    { label: 's', char: '丝', syllable: 'sī' },
  ],
  [
    { label: 'y', char: '衣', syllable: 'yī' },
    { label: 'w', char: '乌', syllable: 'wū' },
  ],
]

// Finals are voiced as the standalone syllable when one exists (written
// with y-/w- per pinyin spelling rules: i → yi, ui → wei, un → wen…). eng
// and ong never stand alone, so they use a common syllable ending in them.
const FINALS: Sound[][] = [
  [
    { label: 'a', char: '啊', syllable: 'ā' },
    { label: 'o', char: '喔', syllable: 'ō' },
    { label: 'e', char: '鹅', syllable: 'é' },
    { label: 'i', char: '衣', syllable: 'yī' },
    { label: 'u', char: '乌', syllable: 'wū' },
    { label: 'ü', char: '鱼', syllable: 'yú' },
  ],
  [
    { label: 'ai', char: '爱', syllable: 'ài' },
    { label: 'ei', char: '杯', syllable: 'bēi' },
    { label: 'ui', char: '威', syllable: 'wēi' },
    { label: 'ao', char: '奥', syllable: 'ào' },
    { label: 'ou', char: '欧', syllable: 'ōu' },
    { label: 'iu', char: '优', syllable: 'yōu' },
  ],
  [
    { label: 'ie', char: '椰', syllable: 'yē' },
    { label: 'üe', char: '月', syllable: 'yuè' },
    { label: 'er', char: '耳', syllable: 'ěr' },
  ],
  [
    { label: 'an', char: '安', syllable: 'ān' },
    { label: 'en', char: '恩', syllable: 'ēn' },
    { label: 'in', char: '音', syllable: 'yīn' },
    { label: 'un', char: '温', syllable: 'wēn' },
    { label: 'ün', char: '云', syllable: 'yún' },
  ],
  [
    { label: 'ang', char: '昂', syllable: 'áng' },
    { label: 'eng', char: '灯', syllable: 'dēng' },
    { label: 'ing', char: '英', syllable: 'yīng' },
    { label: 'ong', char: '东', syllable: 'dōng' },
  ],
]

// The classic mā/má/mǎ/mà minimal set. The neutral tone only exists
// after another syllable, so it is voiced as 妈妈 (māma).
const TONES = [
  { mark: 'ā', key: 'tone1', char: '妈', syllable: 'mā', meaning: 'mother' },
  { mark: 'á', key: 'tone2', char: '麻', syllable: 'má', meaning: 'hemp' },
  { mark: 'ǎ', key: 'tone3', char: '马', syllable: 'mǎ', meaning: 'horse' },
  { mark: 'à', key: 'tone4', char: '骂', syllable: 'mà', meaning: 'to scold' },
  { mark: 'a', key: 'tone0', char: '妈妈', syllable: 'māma', meaning: 'mom' },
] as const

const TONE_VI: Record<string, { name: string; hint: string; meaning: string }> = {
  tone1: { name: 'Thanh 1', hint: 'Cao, đều, giữ nguyên độ cao — gần như không dấu nhưng cao hơn', meaning: 'mẹ' },
  tone2: { name: 'Thanh 2', hint: 'Đi lên từ trung bình lên cao — gần dấu sắc', meaning: 'cây gai' },
  tone3: { name: 'Thanh 3', hint: 'Xuống thấp rồi lên — gần dấu hỏi', meaning: 'con ngựa' },
  tone4: { name: 'Thanh 4', hint: 'Rơi mạnh từ cao xuống thấp — gần dấu huyền nhưng dứt khoát', meaning: 'mắng' },
  tone0: { name: 'Thanh nhẹ', hint: 'Ngắn, nhẹ, không nhấn — luôn đứng sau âm tiết khác', meaning: 'mẹ (khẩu ngữ)' },
}

const TONE_EN: Record<string, { name: string; hint: string }> = {
  tone1: { name: '1st tone', hint: 'High and level' },
  tone2: { name: '2nd tone', hint: 'Rising, like asking "what?"' },
  tone3: { name: '3rd tone', hint: 'Dips low, then rises' },
  tone4: { name: '4th tone', hint: 'Sharp fall from high to low' },
  tone0: { name: 'Neutral tone', hint: 'Short and light; always follows another syllable' },
}

interface PinyinChartProps {
  set: PinyinSet
  onBack: () => void
}

function SoundTile({ sound }: { sound: Sound }) {
  return (
    <button
      type="button"
      className="tile"
      onClick={() => speak(sound.char, 'zh-CN')}
      aria-label={`${sound.label} — ${sound.syllable}`}
    >
      <span className="tile-main">{sound.label}</span>
      <span className="tile-sub">
        {sound.char} {sound.syllable}
      </span>
    </button>
  )
}

export default function PinyinChart({ set, onBack }: PinyinChartProps) {
  const { t, i18n } = useTranslation()
  const isVietnamese = i18n.language.startsWith('vi')

  return (
    <div className="page">
      <PageHeader
        eyebrow={t('eyebrow.pinyin')}
        title={t(`chinese.pinyinSelect.${set}`)}
        subtitle={t('chinese.pinyinChart.tapToListen')}
        backLabel={t('chinese.pinyinChart.back')}
        onBack={onBack}
      />

      {set !== 'tones' && (
        <div className="tile-groups">
          {(set === 'initials' ? INITIALS : FINALS).map((row, i) => (
            <div key={i} className="tile-grid">
              {row.map((sound) => (
                <SoundTile key={sound.label} sound={sound} />
              ))}
            </div>
          ))}
        </div>
      )}

      {set === 'tones' && (
        <div className="list">
          {TONES.map((tone) => {
            const en = TONE_EN[tone.key]
            const vi = TONE_VI[tone.key]
            return (
              <button
                key={tone.key}
                type="button"
                className="list-row"
                onClick={() => speak(tone.char, 'zh-CN')}
              >
                <span className="tone-mark">{tone.mark}</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className="list-title">{isVietnamese ? vi.name : en.name}</span>
                  <span className="list-sub">{isVietnamese ? vi.hint : en.hint}</span>
                </span>
                <span className="tone-example">
                  <span className="list-title">
                    {tone.char} {tone.syllable}
                  </span>
                  <span className="list-sub">{isVietnamese ? vi.meaning : tone.meaning}</span>
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
