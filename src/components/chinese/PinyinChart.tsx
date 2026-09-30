import { Button, Card, Col, Row, Typography, Space } from 'antd'
import { LeftOutlined, SoundOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import type { PinyinSet } from './PinyinSelect'
import { speak } from '../../utils/speech'

const { Title, Text } = Typography

const INITIALS = [
  ['b', 'p', 'm', 'f'],
  ['d', 't', 'n', 'l'],
  ['g', 'k', 'h'],
  ['j', 'q', 'x'],
  ['zh', 'ch', 'sh', 'r'],
  ['z', 'c', 's'],
  ['y', 'w'],
]

const FINALS = [
  ['a', 'o', 'e', 'i', 'u', 'ü'],
  ['ai', 'ei', 'ui', 'ao', 'ou', 'iu'],
  ['ie', 'üe', 'er'],
  ['an', 'en', 'in', 'un', 'ün'],
  ['ang', 'eng', 'ing', 'ong'],
]

const TONES = [
  { mark: 'ā', number: '1', name: '1st tone', nameVi: 'thanh 1 (bằng)', example: 'māo (猫)', meaning: 'cat', color: '#7aa7d9' },
  { mark: 'á', number: '2', name: '2nd tone', nameVi: 'thanh 2 (sắc)', example: 'máo (毛)', meaning: 'hair', color: '#7ad9a3' },
  { mark: 'ǎ', number: '3', name: '3rd tone', nameVi: 'thanh 3 (hỏi)', example: 'mǎo (卯)', meaning: 'Mao (zodiac)', color: '#d9a97a' },
  { mark: 'à', number: '4', name: '4th tone', nameVi: 'thanh 4 (nặng)', example: 'mào (帽)', meaning: 'hat', color: '#b17ad9' },
  { mark: 'a', number: '0', name: 'Neutral tone', nameVi: 'thanh nhẹ (trung hòa)', example: 'ma (吗)', meaning: 'question particle', color: '#8a97a3' },
]

interface PinyinChartProps {
  set: PinyinSet
  onBack: () => void
}

export default function PinyinChart({ set, onBack }: PinyinChartProps) {
  const { t } = useTranslation()

  return (
    <div style={{ padding: '24px 16px', maxWidth: 720, margin: '0 auto' }}>
      <Button type="text" onClick={onBack} style={{ paddingLeft: 4, paddingRight: 4, marginBottom: 16 }}>
        <LeftOutlined /> {t('chinese.pinyinChart.back')}
      </Button>
      <Title level={3} style={{ color: '#5b6b7a' }}>
        {t(`chinese.pinyinSelect.${set}`)}
      </Title>
      <Text style={{ display: 'block', marginBottom: 24, color: '#8a97a3' }}>
        {t('chinese.pinyinChart.tapToListen')}
      </Text>

      {set === 'initials' && (
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          {INITIALS.map((row, i) => (
            <Row key={i} gutter={[8, 8]}>
              {row.map((initial) => (
                <Col key={initial} xs={6} sm={4} md={3}>
                  <Card
                    hoverable
                    onClick={() => speak(initial + 'a', 'zh-CN')}
                    style={{ textAlign: 'center', borderRadius: 12, border: '1px solid #7aa7d933' }}
                    styles={{ body: { padding: '12px 4px' } }}
                  >
                    <Text strong style={{ fontSize: 20, color: '#3d4954' }}>{initial}</Text>
                    <Button
                      type="text"
                      size="small"
                      icon={<SoundOutlined />}
                      style={{ display: 'block', margin: '4px auto 0', color: '#7aa7d9' }}
                      onClick={(e) => { e.stopPropagation(); speak(initial + 'a', 'zh-CN') }}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          ))}
        </Space>
      )}

      {set === 'finals' && (
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          {FINALS.map((row, i) => (
            <Row key={i} gutter={[8, 8]}>
              {row.map((final) => (
                <Col key={final} xs={8} sm={6} md={4}>
                  <Card
                    hoverable
                    onClick={() => speak(final, 'zh-CN')}
                    style={{ textAlign: 'center', borderRadius: 12, border: '1px solid #7ad9a333' }}
                    styles={{ body: { padding: '12px 4px' } }}
                  >
                    <Text strong style={{ fontSize: 20, color: '#3d4954' }}>{final}</Text>
                    <Button
                      type="text"
                      size="small"
                      icon={<SoundOutlined />}
                      style={{ display: 'block', margin: '4px auto 0', color: '#7ad9a3' }}
                      onClick={(e) => { e.stopPropagation(); speak(final, 'zh-CN') }}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          ))}
        </Space>
      )}

      {set === 'tones' && (
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          {TONES.map((tone) => (
            <Card
              key={tone.number}
              style={{ borderRadius: 16, border: `1px solid ${tone.color}44` }}
              hoverable
              onClick={() => speak(tone.example.split(' ')[0], 'zh-CN')}
            >
              <Row align="middle" gutter={16}>
                <Col>
                  <div style={{ fontSize: 40, fontWeight: 700, color: tone.color, width: 56, textAlign: 'center' }}>
                    {tone.mark}
                  </div>
                </Col>
                <Col flex="auto">
                  <Text strong style={{ fontSize: 16 }}>{tone.name}</Text>
                  <br />
                  <Text style={{ color: '#8a97a3' }}>{tone.nameVi}</Text>
                  <br />
                  <Text style={{ color: '#5b6b7a' }}>{tone.example} — {tone.meaning}</Text>
                </Col>
                <Col>
                  <Button
                    type="text"
                    icon={<SoundOutlined />}
                    style={{ color: tone.color }}
                    onClick={(e) => { e.stopPropagation(); speak(tone.example.split(' ')[0], 'zh-CN') }}
                  />
                </Col>
              </Row>
            </Card>
          ))}
        </Space>
      )}
    </div>
  )
}
