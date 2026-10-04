import { useTranslation } from 'react-i18next'
import type { VocabularyWord } from '../../data/english/vocabulary'
import { englishSpeechText, speak } from '../../utils/speech'
import FlashcardDeck from '../ui/FlashcardDeck'
import { ListenButton } from '../ui/Session'

interface WordLearnProps {
  words: VocabularyWord[]
  accent?: string
  initialIndex?: number
  onIndexChange?: (index: number) => void
  onFinish: () => void
  onBack: () => void
}

const speakWord = (w: VocabularyWord) => speak(englishSpeechText(w.en), 'en-US')

export default function WordLearn({ words, initialIndex, onIndexChange, onFinish, onBack }: WordLearnProps) {
  const { t, i18n } = useTranslation()
  const isVietnamese = i18n.language.startsWith('vi')
  return (
    <FlashcardDeck
      words={words}
      initialIndex={initialIndex}
      onIndexChange={onIndexChange}
      onFinish={onFinish}
      onBack={onBack}
      i18nPrefix=""
      speakWord={speakWord}
      renderFront={(word, play) => (
        <>
          <h2 className="flashcard-word" lang="en">
            {word.en}
          </h2>
          <div className="flashcard-meta">
            <span>{word.ipa}</span>
            <span className="pos-chip">{word.pos}</span>
          </div>
          <ListenButton onClick={play} label={t('wordLearn.listen')} />
          <p className="flashcard-definition">{word.definition}</p>
          <p className="flashcard-example">{word.example}</p>
        </>
      )}
      renderBack={(word) => (
        <>
          <h2 className="flashcard-meaning">{isVietnamese ? word.vi : word.definition}</h2>
          <div className="flashcard-meta">
            <strong style={{ color: 'var(--ink)' }}>{word.en}</strong>
            <span>{word.ipa}</span>
          </div>
        </>
      )}
    />
  )
}
