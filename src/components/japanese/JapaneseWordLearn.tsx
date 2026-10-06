import { useTranslation } from 'react-i18next'
import type { JapaneseWord } from '../../data/japanese/types'
import { japaneseSpeechText, speak } from '../../utils/speech'
import FlashcardDeck from '../ui/FlashcardDeck'
import { ListenButton } from '../ui/Session'

interface JapaneseWordLearnProps {
  words: JapaneseWord[]
  accent?: string
  initialIndex?: number
  onIndexChange?: (index: number) => void
  onFinish: () => void
  onBack: () => void
}

const speakWord = (w: JapaneseWord) => speak(japaneseSpeechText(w), 'ja-JP')

export default function JapaneseWordLearn({
  words,
  initialIndex,
  onIndexChange,
  onFinish,
  onBack,
}: JapaneseWordLearnProps) {
  const { t, i18n } = useTranslation()
  const isVietnamese = i18n.language.startsWith('vi')
  return (
    <FlashcardDeck
      words={words}
      initialIndex={initialIndex}
      onIndexChange={onIndexChange}
      onFinish={onFinish}
      onBack={onBack}
      i18nPrefix="japanese."
      speakWord={speakWord}
      renderFront={(word, play) => (
        <>
          <h2 className="flashcard-word" lang="ja">
            {word.jp}
          </h2>
          {word.reading !== word.jp && (
            <div className="flashcard-reading" lang="ja">
              {word.reading}
            </div>
          )}
          <ListenButton onClick={play} label={t('japanese.wordLearn.listen')} />
        </>
      )}
      renderBack={(word) => (
        <>
          <h2 className="flashcard-meaning">{isVietnamese && word.vi ? word.vi : word.meaning}</h2>
          <div className="flashcard-meta">
            <strong style={{ color: 'var(--ink)' }} lang="ja">
              {word.jp}
            </strong>
            <span>{word.romaji}</span>
          </div>
          {word.example && (
            <div className="flashcard-example-block">
              <div className="flashcard-example-sentence" lang="ja">{word.example.sentence}</div>
              <div className="flashcard-example-reading" lang="ja">{word.example.reading}</div>
              <div className="flashcard-example-translation">
                {isVietnamese ? word.example.vi : word.example.meaning}
              </div>
            </div>
          )}
        </>
      )}
    />
  )
}
