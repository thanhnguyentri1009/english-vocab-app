import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Button } from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useHotkeys } from '../../hooks/useHotkeys'
import { Flashcard, KeyHint, SessionBar } from './Session'

interface FlashcardDeckProps<T> {
  words: T[]
  initialIndex?: number
  onIndexChange?: (index: number) => void
  onFinish: () => void
  onBack: () => void
  // Prefix for the track's translation keys: '' (English), 'japanese.', 'chinese.'.
  i18nPrefix: string
  speakWord: (word: T) => void
  renderFront: (word: T, play: () => void) => ReactNode
  renderBack: (word: T) => ReactNode
}

export default function FlashcardDeck<T>({
  words,
  initialIndex = 0,
  onIndexChange,
  onFinish,
  onBack,
  i18nPrefix,
  speakWord,
  renderFront,
  renderBack,
}: FlashcardDeckProps<T>) {
  const { t } = useTranslation()
  const k = (key: string) => t(`${i18nPrefix}wordLearn.${key}`)
  const [index, setIndex] = useState(() => Math.min(initialIndex, Math.max(words.length - 1, 0)))
  const [flipped, setFlipped] = useState(false)
  const word = words[index]
  const isLast = index === words.length - 1

  // Skip the very first run (mount, resuming a saved position) — only
  // report real navigation, so resuming a session never re-pushes stale
  // progress to Firestore with a fresh timestamp and clobbers newer data
  // synced from another device.
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    onIndexChange?.(index)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

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

  const play = () => word && speakWord(word)
  const flip = () => setFlipped((f) => !f)

  useHotkeys({
    ' ': flip,
    Enter: flip,
    ArrowRight: goNext,
    ArrowLeft: goPrev,
    p: play,
    P: play,
  })

  if (!word) return null

  return (
    <div className="session">
      <SessionBar current={index + 1} total={words.length} onExit={onBack} exitLabel={k('levelOverview')} />

      <Flashcard
        flipped={flipped}
        onFlip={flip}
        front={renderFront(word, play)}
        back={renderBack(word)}
        hint={k('tapToTranslate')}
      />

      <div className="session-actions">
        <Button size="large" icon={<ArrowLeftOutlined />} onClick={goPrev} disabled={index === 0}>
          {k('back')}
        </Button>
        <Button type="primary" size="large" onClick={goNext}>
          {isLast ? k('startQuiz') : k('nextWord')} <ArrowRightOutlined />
        </Button>
      </div>

      <KeyHint>
        <kbd>Space</kbd> {t('hotkeys.flip')} · <kbd>←</kbd> <kbd>→</kbd> {t('hotkeys.navigate')} · <kbd>P</kbd>{' '}
        {t('hotkeys.listen')}
      </KeyHint>
    </div>
  )
}
