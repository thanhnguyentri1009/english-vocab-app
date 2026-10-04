import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useHotkeys } from '../../hooks/useHotkeys'
import { KeyHint, QuizOption, QuizPrompt, QuizResult, SessionBar, optionState } from '../ui/Session'
import type { VocabularyWord } from '../../data/english/vocabulary'


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
  accent?: string
  onComplete: () => void
  onDone: () => void
  onBack: () => void
}

export default function Quiz({ words, pool, onComplete, onDone, onBack }: QuizProps) {
  const { t } = useTranslation()
  const questions = useMemo(() => buildQuestions(words, pool), [words, pool])
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<VocabularyWord | null>(null)
  const [wrongOptions, setWrongOptions] = useState<Set<string>>(new Set())
  const [flashWrong, setFlashWrong] = useState<string | null>(null)
  const [erred, setErred] = useState(false)
  const [score, setScore] = useState(0)
  const [missedWords, setMissedWords] = useState<VocabularyWord[]>([])
  const [finished, setFinished] = useState(false)
  const completedRef = useRef(false)

  // Mark the batch as learned the moment the quiz finishes, regardless of
  // which button the user taps afterwards (or if they just close the tab).
  // Guarded so it only ever fires once per batch, even under React
  // StrictMode's dev-only double-invoked effects.
  useEffect(() => {
    if (finished && !completedRef.current) {
      completedRef.current = true
      onComplete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

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

  // Briefly flash the wrong option red, then clear it so the user can pick
  // again — a miss no longer skips straight to the next question.
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
          title={t('quiz.scored', { score, total: questions.length })}
          subtitle={
            score === questions.length
              ? score === 1
                ? t('quiz.masteredSingle')
                : t('quiz.masteredPlural', { count: questions.length })
              : t('quiz.reviewMissed')
          }
          actions={
            <>
              <Button type="primary" size="large" onClick={onDone}>
                {t('quiz.learnNewWords')} <ArrowRightOutlined />
              </Button>
              <Button size="large" onClick={onBack}>
                {t('quiz.levelOverview')}
              </Button>
            </>
          }
          missedTitle={t('quiz.wordsMissed', { count: missedWords.length })}
          missed={missedWords.map((word) => ({
            key: word.en,
            primary: word.en,
            secondary: word.vi,
            lang: 'en',
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
        exitLabel={t('quiz.levelOverviewBack')}
      />

      <QuizPrompt label={t('quiz.prompt')}>{question.word.vi}</QuizPrompt>

      <div className="quiz-options">
        {question.options.map((option, optionIndex) => {
          const isFlashingWrong = flashWrong === option.en
          const isPermanentlyWrong = !isFlashingWrong && wrongOptions.has(option.en)
          return (
            <QuizOption
              key={option.en}
              index={optionIndex}
              state={optionState({
                isCorrect: option.en === question.word.en,
                answered: Boolean(selected),
                flashing: isFlashingWrong,
                eliminated: isPermanentlyWrong,
              })}
              disabled={Boolean(selected) || isFlashingWrong || isPermanentlyWrong}
              onClick={() => choose(option)}
              main={option.en}
              lang="en"
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
