import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useHotkeys } from '../../hooks/useHotkeys'
import { KeyHint, QuizOption, QuizPrompt, QuizResult, SessionBar, optionState } from '../ui/Session'
import type { JapaneseWord } from '../../data/japanese/types'


interface Question {
  word: JapaneseWord
  options: JapaneseWord[]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQuestions(words: JapaneseWord[], pool: JapaneseWord[]): Question[] {
  return words.map((word) => {
    const distractors = shuffle(pool.filter((w) => w.id !== word.id)).slice(0, 3)
    const options = shuffle([word, ...distractors])
    return { word, options }
  })
}

interface JapaneseQuizProps {
  words: JapaneseWord[]
  pool: JapaneseWord[]
  accent?: string
  onComplete: () => void
  onDone: () => void
  onBack: () => void
}

export default function JapaneseQuiz({ words, pool, onComplete, onDone, onBack }: JapaneseQuizProps) {
  const { t, i18n } = useTranslation()
  const isVietnamese = i18n.language.startsWith('vi')
  const questions = useMemo(() => buildQuestions(words, pool), [words, pool])
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<JapaneseWord | null>(null)
  const [wrongOptions, setWrongOptions] = useState<Set<string>>(new Set())
  const [flashWrong, setFlashWrong] = useState<string | null>(null)
  const [erred, setErred] = useState(false)
  const [score, setScore] = useState(0)
  const [missedWords, setMissedWords] = useState<JapaneseWord[]>([])
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

  const choose = (option: JapaneseWord) => {
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
          title={t('japanese.quiz.scored', { score, total: questions.length })}
          subtitle={
            score === questions.length
              ? score === 1
                ? t('japanese.quiz.masteredSingle')
                : t('japanese.quiz.masteredPlural', { count: questions.length })
              : t('japanese.quiz.reviewMissed')
          }
          actions={
            <>
              <Button type="primary" size="large" onClick={onDone}>
                {t('japanese.quiz.learnNewWords')} <ArrowRightOutlined />
              </Button>
              <Button size="large" onClick={onBack}>
                {t('japanese.quiz.levelOverview')}
              </Button>
            </>
          }
          missedTitle={t('japanese.quiz.wordsMissed', { count: missedWords.length })}
          missed={missedWords.map((word) => ({
            key: word.id,
            primary: word.jp,
            secondary: isVietnamese && word.vi ? word.vi : word.meaning,
            lang: 'ja',
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
        exitLabel={t('japanese.quiz.levelOverviewBack')}
      />

      <QuizPrompt label={t('japanese.quiz.prompt')}>{isVietnamese && question.word.vi ? question.word.vi : question.word.meaning}</QuizPrompt>

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
              main={option.jp}
              sub={option.reading}
              lang="ja"
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
