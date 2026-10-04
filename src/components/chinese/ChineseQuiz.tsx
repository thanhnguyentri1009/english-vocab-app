import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useHotkeys } from '../../hooks/useHotkeys'
import { KeyHint, QuizOption, QuizPrompt, QuizResult, SessionBar, optionState } from '../ui/Session'
import type { ChineseWord } from '../../data/chinese/types'


interface Question {
  word: ChineseWord
  options: ChineseWord[]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQuestions(words: ChineseWord[], pool: ChineseWord[]): Question[] {
  return words.map((word) => {
    const distractors = shuffle(pool.filter((w) => w.id !== word.id)).slice(0, 3)
    const options = shuffle([word, ...distractors])
    return { word, options }
  })
}

interface ChineseQuizProps {
  words: ChineseWord[]
  pool: ChineseWord[]
  accent?: string
  onComplete: () => void
  onDone: () => void
  onBack: () => void
}

export default function ChineseQuiz({ words, pool, onComplete, onDone, onBack }: ChineseQuizProps) {
  const { t, i18n } = useTranslation()
  const isVietnamese = i18n.language.startsWith('vi')
  const questions = useMemo(() => buildQuestions(words, pool), [words, pool])
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<ChineseWord | null>(null)
  const [wrongOptions, setWrongOptions] = useState<Set<string>>(new Set())
  const [flashWrong, setFlashWrong] = useState<string | null>(null)
  const [erred, setErred] = useState(false)
  const [score, setScore] = useState(0)
  const [missedWords, setMissedWords] = useState<ChineseWord[]>([])
  const [finished, setFinished] = useState(false)
  const completedRef = useRef(false)

  useEffect(() => {
    if (finished && !completedRef.current) {
      completedRef.current = true
      onComplete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  const question = questions[step]
  const isLast = step === questions.length - 1

  const choose = (option: ChineseWord) => {
    if (selected || flashWrong || wrongOptions.has(option.id)) return
    if (option.id === question.word.id) {
      setSelected(option)
      if (!erred) setScore((s) => s + 1)
    } else {
      setErred(true)
      setFlashWrong(option.id)
      setWrongOptions((prev) => new Set(prev).add(option.id))
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

  // 1–4 picks the matching option.
  useHotkeys(
    Object.fromEntries(
      (question?.options ?? []).map((option, i) => [String(i + 1), () => choose(option)]),
    ),
    !finished,
  )

  if (finished) {
    return (
      <div className="session">
        <QuizResult
          score={score}
          total={questions.length}
          title={t('chinese.quiz.scored', { score, total: questions.length })}
          subtitle={
            score === questions.length
              ? score === 1
                ? t('chinese.quiz.masteredSingle')
                : t('chinese.quiz.masteredPlural', { count: questions.length })
              : t('chinese.quiz.reviewMissed')
          }
          actions={
            <>
              <Button type="primary" size="large" onClick={onDone}>
                {t('chinese.quiz.learnNewWords')} <ArrowRightOutlined />
              </Button>
              <Button size="large" onClick={onBack}>
                {t('chinese.quiz.levelOverview')}
              </Button>
            </>
          }
          missedTitle={t('chinese.quiz.wordsMissed', { count: missedWords.length })}
          missed={missedWords.map((word) => ({
            key: word.id,
            primary: word.zh,
            secondary: isVietnamese ? word.vi : word.meaning,
            lang: 'zh-CN',
          }))}
        />
      </div>
    )
  }

  return (
    <div className="session">
      <SessionBar
        current={step + 1}
        total={questions.length}
        onExit={onBack}
        exitLabel={t('chinese.quiz.levelOverviewBack')}
      />

      <QuizPrompt label={t('chinese.quiz.prompt')}>{isVietnamese ? question.word.vi : question.word.meaning}</QuizPrompt>

      <div className="quiz-options">
        {question.options.map((option, optionIndex) => {
          const isFlashingWrong = flashWrong === option.id
          const isPermanentlyWrong = !isFlashingWrong && wrongOptions.has(option.id)
          return (
            <QuizOption
              key={option.id}
              index={optionIndex}
              state={optionState({
                isCorrect: option.id === question.word.id,
                answered: Boolean(selected),
                flashing: isFlashingWrong,
                eliminated: isPermanentlyWrong,
              })}
              disabled={Boolean(selected) || isFlashingWrong || isPermanentlyWrong}
              onClick={() => choose(option)}
              main={option.zh}
              sub={option.pinyin}
              lang="zh-CN"
            />
          )
        })}
      </div>

      <KeyHint>
        <kbd>1</kbd>–<kbd>4</kbd> {t('hotkeys.answer')}
      </KeyHint>
    </div>
  )
}
