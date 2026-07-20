import { useState } from 'react'
import { Button, Card, Typography, Row, Col, Progress, Space, Tag } from 'antd'
import { LeftOutlined, RightOutlined, SoundOutlined } from '@ant-design/icons'
import type { VocabularyWord } from '../data/vocabulary'

const { Title, Text, Paragraph } = Typography

function speak(text: string) {
  if (!window.speechSynthesis) return
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'en-US'
  window.speechSynthesis.speak(utter)
}

interface WordLearnProps {
  words: VocabularyWord[]
  accent: string
  onFinish: () => void
  onBack: () => void
}

export default function WordLearn({ words, accent, onFinish, onBack }: WordLearnProps) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const word = words[index]
  const isLast = index === words.length - 1

  const goNext = () => {
    if (isLast) {
      onFinish()
      return
    }
    setFlipped(false)
    setIndex((i) => i + 1)
  }

  const goPrev = () => {
    if (index === 0) return
    setFlipped(false)
    setIndex((i) => i - 1)
  }

  return (
    <div style={{ padding: '24px 16px', maxWidth: 640, margin: '0 auto' }}>
      <Space
        style={{
          width: '100%',
          justifyContent: 'space-between',
          marginBottom: 16,
          flexWrap: 'wrap',
          rowGap: 8,
        }}
      >
        <Button type="text" onClick={onBack} style={{ paddingLeft: 4, paddingRight: 4 }}>
          ← Choose another level
        </Button>
        <Text style={{ color: '#8a97a3', whiteSpace: 'nowrap' }}>
          Word {index + 1} / {words.length}
        </Text>
      </Space>
      <Progress
        percent={((index + 1) / words.length) * 100}
        showInfo={false}
        strokeColor={accent}
        style={{ marginBottom: 24 }}
      />

      <Card
        onClick={() => setFlipped((f) => !f)}
        hoverable
        style={{
          borderRadius: 20,
          textAlign: 'center',
          minHeight: 260,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
          border: `1px solid ${accent}33`,
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
          cursor: 'pointer',
        }}
        styles={{ body: { width: '100%', padding: '20px 16px' } }}
      >
        {!flipped ? (
          <div>
            <Title
              level={2}
              style={{
                margin: 0,
                color: '#3d4954',
                fontSize: 'clamp(24px, 7vw, 40px)',
                wordBreak: 'break-word',
              }}
            >
              {word.en}
            </Title>
            <Space size={8} wrap style={{ marginTop: 4, justifyContent: 'center', width: '100%' }}>
              <Text style={{ color: '#a3adb6' }}>{word.ipa}</Text>
              <Tag color={accent} style={{ borderRadius: 8 }}>
                {word.pos}
              </Tag>
            </Space>
            <Button
              type="text"
              icon={<SoundOutlined />}
              onClick={(e) => {
                e.stopPropagation()
                speak(word.en)
              }}
              style={{ marginTop: 4, color: accent }}
            >
              Listen
            </Button>
            <Paragraph style={{ margin: '12px 0 0', color: '#5b6b7a' }}>
              {word.definition}
            </Paragraph>
            <Paragraph italic style={{ margin: '4px 0 0', color: '#a3adb6' }}>
              "{word.example}"
            </Paragraph>
            <Text style={{ display: 'block', marginTop: 16, color: '#a3adb6' }}>
              (Tap the card to see the translation)
            </Text>
          </div>
        ) : (
          <div>
            <Title
              level={2}
              style={{
                margin: 0,
                color: accent,
                fontSize: 'clamp(22px, 6vw, 32px)',
                wordBreak: 'break-word',
              }}
            >
              {word.vi}
            </Title>
            <Text style={{ display: 'block', marginTop: 16, color: '#a3adb6' }}>
              {word.en} {word.ipa}
            </Text>
          </div>
        )}
      </Card>

      <Row justify="center" style={{ marginTop: 24 }} gutter={16}>
        <Col>
          <Button
            icon={<LeftOutlined />}
            onClick={goPrev}
            disabled={index === 0}
            shape="round"
          >
            Back
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={goNext}
            shape="round"
            style={{ background: accent, borderColor: accent }}
          >
            {isLast ? 'Start the quiz' : 'Next word'} <RightOutlined />
          </Button>
        </Col>
      </Row>
    </div>
  )
}
