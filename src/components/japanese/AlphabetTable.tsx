import { Button, Card, Col, Row, Typography } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { HIRAGANA, KATAKANA, KANJI, type AlphabetSet, type KanaGroup } from '../../data/japanese/alphabet'
import { speak } from '../../utils/speech'

const { Title, Text } = Typography

interface AlphabetTableProps {
  set: AlphabetSet
  onBack: () => void
}

const KANA_GROUPS: KanaGroup[] = ['basic', 'dakuten', 'handakuten', 'yoon']

export default function AlphabetTable({ set, onBack }: AlphabetTableProps) {
  const { t } = useTranslation()
  const accent = set === 'hiragana' ? '#7aa7d9' : set === 'katakana' ? '#7ad9a3' : '#d9a97a'

  return (
    <div style={{ padding: '24px 16px', maxWidth: 720, margin: '0 auto' }}>
      <Button
        type="text"
        icon={<LeftOutlined />}
        onClick={onBack}
        style={{ paddingLeft: 4, paddingRight: 4, marginBottom: 8 }}
      >
        {t('japanese.alphabetTable.back')}
      </Button>
      <Title level={2} style={{ textAlign: 'center', color: accent, fontSize: 'clamp(22px, 6vw, 30px)' }}>
        {t(`japanese.alphabetSelect.${set}`)}
      </Title>
      <Text style={{ display: 'block', textAlign: 'center', marginBottom: 24, color: '#8a97a3' }}>
        {t('japanese.alphabetTable.tapToListen')}
      </Text>

      {set === 'kanji' ? (
        <Row gutter={[12, 12]}>
          {KANJI.map((k) => (
            <Col xs={12} sm={8} key={k.char}>
              <Card
                hoverable
                onClick={() => speak(k.char, 'ja-JP')}
                style={{
                  borderRadius: 14,
                  textAlign: 'center',
                  border: `1px solid ${accent}33`,
                  cursor: 'pointer',
                }}
                styles={{ body: { padding: '14px 10px' } }}
              >
                <div style={{ fontSize: 34, fontWeight: 700, color: '#3d4954' }}>{k.char}</div>
                <Text style={{ display: 'block', color: '#5b6b7a', marginTop: 4 }}>
                  {k.meanings.join(', ')}
                </Text>
                {k.onYomi.length > 0 && (
                  <Text style={{ display: 'block', color: '#a3adb6', fontSize: 12, marginTop: 4 }}>
                    {t('japanese.alphabetTable.onyomi')}: {k.onYomi.join('、')}
                  </Text>
                )}
                {k.kunYomi.length > 0 && (
                  <Text style={{ display: 'block', color: '#a3adb6', fontSize: 12 }}>
                    {t('japanese.alphabetTable.kunyomi')}: {k.kunYomi.join('、')}
                  </Text>
                )}
                <Text style={{ display: 'block', color: '#c7ccd1', fontSize: 12, marginTop: 4 }}>
                  {t('japanese.alphabetTable.strokes', { count: k.strokeCount })}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        KANA_GROUPS.map((group) => {
          const chars = (set === 'hiragana' ? HIRAGANA : KATAKANA).filter((c) => c.group === group)
          if (chars.length === 0) return null
          return (
            <div key={group} style={{ marginBottom: 20 }}>
              <Text style={{ display: 'block', color: '#8a97a3', marginBottom: 8, fontWeight: 600 }}>
                {t(`japanese.alphabetTable.group.${group}`)}
              </Text>
              <Row gutter={[10, 10]}>
                {chars.map((c) => (
                  <Col xs={6} sm={4} key={c.char}>
                    <Card
                      hoverable
                      onClick={() => speak(c.char, 'ja-JP')}
                      style={{
                        borderRadius: 12,
                        textAlign: 'center',
                        border: `1px solid ${accent}33`,
                        cursor: 'pointer',
                      }}
                      styles={{ body: { padding: '12px 4px' } }}
                    >
                      <div style={{ fontSize: 26, fontWeight: 700, color: '#3d4954' }}>{c.char}</div>
                      <Text style={{ color: '#a3adb6', fontSize: 12 }}>{c.romaji}</Text>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )
        })
      )}
    </div>
  )
}
