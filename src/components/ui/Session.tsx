import { Button } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  SoundOutlined,
  TrophyOutlined,
  ReadOutlined,
} from '@ant-design/icons'
import type { ReactNode } from 'react'

// ── Progress bar shown at the top of every learning session ─────────────

interface SessionBarProps {
  current: number
  total: number
  onExit: () => void
  exitLabel: string
}

export function SessionBar({ current, total, onExit, exitLabel }: SessionBarProps) {
  const percent = total > 0 ? (current / total) * 100 : 0
  return (
    <div className="session-bar">
      <Button
        type="text"
        shape="circle"
        icon={<CloseOutlined />}
        onClick={onExit}
        className="session-exit"
        aria-label={exitLabel}
        title={exitLabel}
      />
      <div
        className="session-progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
      >
        <span style={{ width: `${percent}%` }} />
      </div>
      <span className="session-count">
        {current}/{total}
      </span>
    </div>
  )
}

// ── Flashcard ───────────────────────────────────────────────────────────

interface FlashcardProps {
  flipped: boolean
  onFlip: () => void
  front: ReactNode
  back: ReactNode
  hint?: ReactNode
}

export function Flashcard({ flipped, onFlip, front, back, hint }: FlashcardProps) {
  return (
    <div
      className="flashcard"
      data-flipped={flipped}
      onClick={onFlip}
      role="button"
      tabIndex={-1}
      aria-pressed={flipped}
    >
      <div className="flashcard-inner">
        <div className="flashcard-face" aria-hidden={flipped}>
          {front}
          {hint && <span className="flashcard-hint">{hint}</span>}
        </div>
        <div className="flashcard-face flashcard-back" aria-hidden={!flipped}>
          {back}
        </div>
      </div>
    </div>
  )
}

export function ListenButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      className="listen-btn"
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      aria-label={label}
      title={label}
    >
      <SoundOutlined />
    </button>
  )
}

// ── Quiz ────────────────────────────────────────────────────────────────

export function QuizPrompt({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="quiz-prompt">
      <span className="quiz-prompt-label">{label}</span>
      <h2 className="quiz-prompt-text">{children}</h2>
    </div>
  )
}

export type OptionState = 'idle' | 'correct' | 'wrong' | 'eliminated'

interface QuizOptionProps {
  index: number
  state: OptionState
  disabled: boolean
  onClick: () => void
  main: ReactNode
  sub?: ReactNode
  lang?: string
}

export function QuizOption({ index, state, disabled, onClick, main, sub, lang }: QuizOptionProps) {
  return (
    <button type="button" className="option" data-state={state} disabled={disabled} onClick={onClick}>
      <span className="option-key">{index + 1}</span>
      <span className="option-body">
        <span className="option-main" lang={lang}>
          {main}
        </span>
        {sub && <span className="option-sub">{sub}</span>}
      </span>
      {state === 'correct' && <CheckOutlined className="option-icon" />}
      {(state === 'wrong' || state === 'eliminated') && <CloseOutlined className="option-icon" />}
    </button>
  )
}

// Shared state mapping for the four-option quizzes.
export function optionState(opts: {
  isCorrect: boolean
  answered: boolean
  flashing: boolean
  eliminated: boolean
}): OptionState {
  if (opts.answered && opts.isCorrect) return 'correct'
  if (opts.flashing) return 'wrong'
  if (opts.eliminated) return 'eliminated'
  return 'idle'
}

// ── Result screen ───────────────────────────────────────────────────────

interface QuizResultProps {
  score: number
  total: number
  title: ReactNode
  subtitle: ReactNode
  actions: ReactNode
  missedTitle?: ReactNode
  missed?: { key: string; primary: ReactNode; secondary: ReactNode; lang?: string }[]
}

export function QuizResult({ score, total, title, subtitle, actions, missedTitle, missed = [] }: QuizResultProps) {
  const perfect = score === total
  return (
    <div className="result">
      <span className="result-badge" data-tone={perfect ? 'success' : 'neutral'}>
        {perfect ? <TrophyOutlined /> : <ReadOutlined />}
      </span>
      <div className="result-score">
        {score}
        <small>/{total}</small>
      </div>
      <h2 className="result-title">{title}</h2>
      <p className="result-sub">{subtitle}</p>
      <div className="result-actions">{actions}</div>
      {missed.length > 0 && (
        <div className="missed">
          {missedTitle && <span className="section-label">{missedTitle}</span>}
          <div className="list">
            {missed.map((m) => (
              <div key={m.key} className="missed-row">
                <strong lang={m.lang}>{m.primary}</strong>
                <span style={{ color: 'var(--muted)', textAlign: 'right' }}>{m.secondary}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function KeyHint({ children }: { children: ReactNode }) {
  return <span className="kbd-hint">{children}</span>
}
