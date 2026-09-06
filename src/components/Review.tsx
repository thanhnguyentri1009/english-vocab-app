import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Button, Card, Typography, Row, Col, Progress, Space, Result, List } from 'antd'
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
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
  return shuffle(words).map((word) => {
    const distractors = shuffle(pool.filter((w) => w.en !== word.en)).slice(0, 3)
    const options = shuffle([word, ...distractors])
    return { word, options }
  })
}

interface ReviewProps {
  words: VocabularyWord[]
  pool: VocabularyWord[]
  accent: string
  onBack: () => void
}

// Practice mode: reshuffles the learned words into a fresh question order
// every round and never persists score, mistakes, or position anywhere.
export default function Review({ words, pool, accent, onBack }: ReviewProps) {
  const { t } = useTranslation()
  const [round, setRound] = useState(0)
  // `round` is a deliberate cache-buster so "Review again" reshuffles.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = useMemo(() => buildQuestions(words, pool), [words, pool, round])
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<VocabularyWord | null>(null)
  const [wrongOptions, setWrongOptions] = useState<Set<string>>(new Set())
  const [flashWrong, setFlashWrong] = useState<string | null>(null)
  const [erred, setErred] = useState(false)
  const [score, setScore] = useState(0)
  const [missedWords, setMissedWords] = useState<VocabularyWord[]>([])
  const [finished, setFinished] = useState(false)

  const question = questions[step]
  const isLast = step === questions.length - 1

  const choose = (option: VocabularyWord) => {
    if (selected || flashWrong || wrongOptions.has(option.en)) return
    if (option.en === question.word.en) {
      setSelected(option)
      if (!erred) setScore((s) => s + 1)
    } else {
      setErred(true)
      setFlashWrong(option.en)
      setWrongOptions((prev) => new Set(prev).add(option.en))
    }
  }

  useEffect(() => {
    if (!flashWrong) return
    const timer = setTimeout(() => setFlashWrong(null), 700)
    return () => clearTimeout(timer)
  }, [flashWrong])

  useEffect(() => {
    if (!selected) return
    const timer = setTimeout(() => {
      setWrongOptions(new Set())
      setErred(false)
      if (erred) setMissedWords((prev) => [...prev, question.word])
      if (isLast) {
        setFinished(true)
      } else {
        setSelected(null)
        setStep((s) => s + 1)
      }
    }, 900)
    return () => clearTimeout(timer)
  }, [selected, isLast, erred, question])

  const restart = () => {
    setRound((r) => r + 1)
    setStep(0)
    setSelected(null)
    setWrongOptions(new Set())
    setFlashWrong(null)
    setErred(false)
    setScore(0)
    setMissedWords([])
    setFinished(false)
  }

  if (questions.length === 0) {
    return (
      <div style={{ padding: '24px 16px', maxWidth: 640, margin: '0 auto' }}>
        <Button type="text" onClick={onBack} style={{ paddingLeft: 4, paddingRight: 4 }}>
          {t('review.levelOverviewBack')}
        </Button>
      </div>
    )
  }

  if (finished) {
    return (
      <div style={{ padding: '24px 16px', maxWidth: 640, margin: '0 auto' }}>
        <Result
          status={score === questions.length ? 'success' : 'info'}
          title={t('review.scored', { score, total: questions.length })}
          subTitle={score === questions.length ? t('review.perfect') : t('review.tryAgainMessage')}
          extra={[
            <Button
              key="again"
              type="primary"
              style={{ background: accent, borderColor: accent }}
              onClick={restart}
            >
              {t('review.reviewAgain')}
            </Button>,
            <Button key="back" onClick={onBack}>
              {t('review.levelOverview')}
            </Button>,
          ]}
        />
        {missedWords.length > 0 && (
          <Card
            title={t('review.wordsMissed', { count: missedWords.length })}
            style={{ borderRadius: 16, marginTop: 8 }}
          >
            <List
              size="small"
              dataSource={missedWords}
              renderItem={(word) => (
                <List.Item>
                  <Space style={{ justifyContent: 'space-between', width: '100%' }} wrap>
                    <Text strong>{word.en}</Text>
                    <Text style={{ color: '#8a97a3' }}>{word.vi}</Text>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        )}
      </div>
    )
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
          {t('review.levelOverviewBack')}
        </Button>
        <Text style={{ color: '#8a97a3', whiteSpace: 'nowrap' }}>
          {t('review.questionCounter', { current: step + 1, total: questions.length })}
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
        <Text style={{ color: '#8a97a3' }}>{t('review.prompt')}</Text>
        <Title
          level={2}
          style={{
            margin: '8px 0 0',
            color: '#3d4954',
            fontSize: 'clamp(22px, 6vw, 32px)',
            wordBreak: 'break-word',
          }}
        >
          {question.word.vi}
        </Title>
      </Card>

      <Row gutter={[16, 16]}>
        {question.options.map((option) => {
          const isCorrect = option.en === question.word.en
          const isFlashingWrong = flashWrong === option.en
          const isPermanentlyWrong = !isFlashingWrong && wrongOptions.has(option.en)
          const isDisabled = Boolean(selected) || isFlashingWrong || isPermanentlyWrong
          let background = '#fff'
          let borderColor = '#e5e9ed'
          let icon: ReactNode = null
          if (selected && isCorrect) {
            background = '#f0fbf4'
            borderColor = '#7ad9a3'
            icon = <CheckCircleFilled style={{ color: '#52c47f' }} />
          } else if (isFlashingWrong) {
            background = '#fff3f0'
            borderColor = '#e88'
            icon = <CloseCircleFilled style={{ color: '#e26a5a' }} />
          } else if (isPermanentlyWrong) {
            background = '#f5f5f5'
            borderColor = '#e5e9ed'
            icon = <CloseCircleFilled style={{ color: '#c7ccd1' }} />
          }
          return (
            <Col xs={24} sm={12} key={option.en}>
              <Card
                hoverable={!isDisabled}
                onClick={() => choose(option)}
                style={{
                  borderRadius: 14,
                  textAlign: 'center',
                  background,
                  border: `1.5px solid ${borderColor}`,
                  cursor: isDisabled ? 'default' : 'pointer',
                  opacity: isPermanentlyWrong ? 0.7 : 1,
                }}
                styles={{ body: { padding: '16px 8px' } }}
              >
                <Space wrap style={{ justifyContent: 'center', width: '100%' }}>
                  <Text strong style={{ fontSize: 16, wordBreak: 'break-word' }}>
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
