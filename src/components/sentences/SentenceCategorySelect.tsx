import { useTranslation } from 'react-i18next'
import { SENTENCE_CATEGORIES, type SentenceCategory, type SentenceDifficulty } from '../../data/sentences/categories'

interface SentenceCategorySelectProps {
  lang: 'zh' | 'jp'
  onSelect: (category: SentenceCategory, difficulty: SentenceDifficulty) => void
}

export default function SentenceCategorySelect({ lang, onSelect }: SentenceCategorySelectProps) {
  const { t, i18n } = useTranslation()
  const isVi = i18n.language.startsWith('vi')
  const accentColor = lang === 'zh' ? '#c0392b' : '#2980b9'

  const basicLabel = t(`${lang === 'zh' ? 'chinese' : 'japanese'}.sentences.basic`)
  const advancedLabel = t(`${lang === 'zh' ? 'chinese' : 'japanese'}.sentences.advanced`)

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#222', margin: 0 }}>
          {t(`${lang === 'zh' ? 'chinese' : 'japanese'}.sentences.title`)}
        </h2>
        <p style={{ fontSize: 14, color: '#888', marginTop: 4, marginBottom: 0 }}>
          {t(`${lang === 'zh' ? 'chinese' : 'japanese'}.sentences.subtitle`)}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {SENTENCE_CATEGORIES.map((cat) => (
          <div
            key={cat.key}
            style={{
              background: '#fff',
              border: '1px solid #e8e6e0',
              borderRadius: 14,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 16px',
                borderBottom: '1px solid #f0ede7',
              }}
            >
              <span style={{ fontSize: 22 }}>{cat.icon}</span>
              <span style={{ fontSize: 15, fontWeight: 600, color: '#222' }}>
                {isVi ? cat.labelVi : cat.labelEn}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 0 }}>
              <button
                type="button"
                onClick={() => onSelect(cat.key, 'basic')}
                style={{
                  flex: 1,
                  padding: '11px 12px',
                  border: 'none',
                  borderRight: '1px solid #f0ede7',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 600,
                  color: accentColor,
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = accentColor + '0d')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ fontSize: 14 }}>📗</span>
                {basicLabel}
              </button>
              <button
                type="button"
                onClick={() => onSelect(cat.key, 'advanced')}
                style={{
                  flex: 1,
                  padding: '11px 12px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#7c5cbf',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#7c5cbf0d')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ fontSize: 14 }}>📘</span>
                {advancedLabel}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
