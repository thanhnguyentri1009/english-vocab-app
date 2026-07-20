import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Button, Card, Typography, Row, Col, Progress, Space, Result } from 'antd'
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import type { VocabularyWord } from '../data/vocabulary'

const { Title, Text } = Typography

interface Question {
  word: VocabularyWord
  options: VocabularyWord[]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQuestions(words: VocabularyWord[], pool: VocabularyWord[]): Question[] {
  return words.map((word) => {
    const distractors = shuffle(pool.filter((w) => w.en !== word.en)).slice(0, 3)
    const options = shuffle([word, ...distractors])
    return { word, options }
  })
}

interface QuizProps {
  words: VocabularyWord[]
  pool: VocabularyWord[]
  accent: string
  onDone: () => void
  onBack: () => void
}

export default function Quiz({ words, pool, accent, onDone, onBack }: QuizProps) {
  const questions = useMemo(() => buildQuestions(words, pool), [words, pool])
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<VocabularyWord | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[step]
  const isLast = step === questions.length - 1

  const choose = (option: VocabularyWord) => {
    if (selected) return
    setSelected(option)
    if (option.en === question.word.en) setScore((s) => s + 1)
  }

  useEffect(() => {
    if (!selected) return
    const timer = setTimeout(() => {
      if (isLast) {
        setFinished(true)
      } else {
        setSelected(null)
        setStep((s) => s + 1)
      }
    }, 900)
    return () => clearTimeout(timer)
  }, [selected, isLast])

  if (finished) {
    return (
      <div style={{ padding: '32px 24px', maxWidth: 640, margin: '0 auto' }}>
        <Result
          status={score === questions.length ? 'success' : 'info'}
          title={`You scored ${score}/${questions.length}`}
          subTitle={
            score === questions.length
              ? 'Great job! You have mastered these 6 words.'
              : 'Review the words you missed and try again.'
          }
          extra={[
            <Button
              key="continue"
              type="primary"
              style={{ background: accent, borderColor: accent }}
              onClick={onDone}
            >
              Learn 6 new words
            </Button>,
            <Button key="back" onClick={onBack}>
              Back to levels
            </Button>,
          ]}
        />
      </div>
    )
  }

  return (
    <div style={{ padding: '32px 24px', maxWidth: 640, margin: '0 auto' }}>
      <Space
        style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}
      >
        <Button type="text" onClick={onBack}>
          ← Choose another level
        </Button>
        <Text style={{ color: '#8a97a3' }}>
          Question {step + 1} / {questions.length}
        </Text>
      </Space>
      <Progress
        percent={((step + 1) / questions.length) * 100}
        showInfo={false}
        strokeColor={accent}
        style={{ marginBottom: 24 }}
      />

      <Card
        style={{
          borderRadius: 20,
          textAlign: 'center',
          background: '#fff',
          border: `1px solid ${accent}33`,
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
          marginBottom: 24,
        }}
      >
        <Text style={{ color: '#8a97a3' }}>What is the English word for this?</Text>
        <Title level={2} style={{ margin: '8px 0 0', color: '#3d4954' }}>
          {question.word.vi}
        </Title>
      </Card>

      <Row gutter={[16, 16]}>
        {question.options.map((option) => {
          const isCorrect = option.en === question.word.en
          const isChosen = selected?.en === option.en
          let background = '#fff'
          let borderColor = '#e5e9ed'
          let icon: ReactNode = null
          if (selected) {
            if (isCorrect) {
              background = '#f0fbf4'
              borderColor = '#7ad9a3'
              icon = <CheckCircleFilled style={{ color: '#52c47f' }} />
            } else if (isChosen) {
              background = '#fff3f0'
              borderColor = '#e88'
              icon = <CloseCircleFilled style={{ color: '#e26a5a' }} />
            }
          }
          return (
            <Col span={12} key={option.en}>
              <Card
                hoverable={!selected}
                onClick={() => choose(option)}
                style={{
                  borderRadius: 14,
                  textAlign: 'center',
                  background,
                  border: `1.5px solid ${borderColor}`,
                  cursor: selected ? 'default' : 'pointer',
                }}
                styles={{ body: { padding: '16px 8px' } }}
              >
                <Space>
                  <Text strong style={{ fontSize: 16 }}>
                    {option.en}
                  </Text>
                  {icon}
                </Space>
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
