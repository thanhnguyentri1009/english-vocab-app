import { Card, Col, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import type { AlphabetSet } from '../../data/japanese/alphabet'

const { Title, Text } = Typography

interface AlphabetSelectProps {
  onSelect: (set: AlphabetSet) => void
}

const SETS: { key: AlphabetSet; color: string; accent: string }[] = [
  { key: 'hiragana', color: '#eaf3ff', accent: '#7aa7d9' },
  { key: 'katakana', color: '#eafff2', accent: '#7ad9a3' },
  { key: 'kanji', color: '#fff6ea', accent: '#d9a97a' },
]

export default function AlphabetSelect({ onSelect }: AlphabetSelectProps) {
  const { t } = useTranslation()
  return (
    <div style={{ padding: '24px 16px', maxWidth: 960, margin: '0 auto' }}>
      <Title
        level={2}
        style={{ textAlign: 'center', color: '#5b6b7a', fontSize: 'clamp(22px, 6vw, 30px)' }}
      >
        {t('japanese.alphabetSelect.title')}
      </Title>
      <Text style={{ display: 'block', textAlign: 'center', marginBottom: 32, color: '#8a97a3' }}>
        {t('japanese.alphabetSelect.subtitle')}
      </Text>
      <Row gutter={[20, 20]} justify="center" align="stretch">
        {SETS.map((set) => (
          <Col key={set.key} xs={24} sm={12} md={8}>
            <Card
              hoverable
              onClick={() => onSelect(set.key)}
              style={{
                textAlign: 'center',
                borderRadius: 16,
                background: set.color,
                border: `1px solid ${set.accent}33`,
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                height: '100%',
              }}
              styles={{
                body: {
                  padding: '32px 16px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                },
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 700, color: set.accent, marginBottom: 6 }}>
                {t(`japanese.alphabetSelect.${set.key}`)}
              </div>
              <Text style={{ color: '#6b7580' }}>{t(`japanese.alphabetSelect.${set.key}Subtitle`)}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
