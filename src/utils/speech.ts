// Text-to-speech built on the Web Speech API.
//
// Setting `utter.lang` alone is not enough: Chrome falls back to the default
// (usually English) voice when it can't resolve the tag, which reads Chinese
// or Japanese text as gibberish, and a zh-HK voice reads Cantonese instead of
// Mandarin. So we pick the voice explicitly, in a strict preference order.

// Languages we accept as a fallback when the exact locale has no voice.
// Cantonese voices (zh-HK, yue) are deliberately absent for zh-CN.
const FALLBACK_LOCALES: Record<string, string[]> = {
  'en-US': ['en-US', 'en-GB', 'en-AU', 'en-CA', 'en-IE', 'en-NZ'],
  'ja-JP': ['ja-JP'],
  'zh-CN': ['zh-CN', 'zh-SG', 'zh-TW', 'cmn-CN', 'cmn-Hans-CN'],
}

// macOS ships novelty English voices that must never be used for teaching.
const NOVELTY_VOICES = /albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|junior|ralph|fred|kathy|princess|deranged|hysterical/i

// Higher-quality neural/online voices first.
const QUALITY_HINTS = [/natural/i, /online/i, /neural/i, /premium/i, /enhanced/i, /google/i]

function normaliseLang(lang: string) {
  return lang.replace('_', '-').toLowerCase()
}

let voices: SpeechSynthesisVoice[] = []
const voiceCache = new Map<string, SpeechSynthesisVoice | null>()

function loadVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  voices = window.speechSynthesis.getVoices()
  voiceCache.clear()
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  loadVoices()
  window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices)
}

function scoreVoice(voice: SpeechSynthesisVoice) {
  const hint = QUALITY_HINTS.findIndex((re) => re.test(voice.name))
  return hint === -1 ? QUALITY_HINTS.length : hint
}

function pickVoice(lang: string): SpeechSynthesisVoice | null {
  if (voiceCache.has(lang)) return voiceCache.get(lang) ?? null
  const locales = (FALLBACK_LOCALES[lang] ?? [lang]).map(normaliseLang)
  let picked: SpeechSynthesisVoice | null = null
  for (const locale of locales) {
    const candidates = voices
      .filter((v) => normaliseLang(v.lang) === locale && !NOVELTY_VOICES.test(v.name))
      .sort((a, b) => scoreVoice(a) - scoreVoice(b))
    if (candidates.length > 0) {
      picked = candidates[0]
      break
    }
  }
  if (voices.length > 0) voiceCache.set(lang, picked)
  return picked
}

export function hasVoiceFor(lang: string) {
  // Before the voice list loads we can't tell; assume yes and let the
  // browser resolve `utter.lang`.
  return voices.length === 0 || pickVoice(lang) !== null
}

export function speak(text: string, lang: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  const clean = text.trim()
  if (!clean) return
  // Cancel anything still playing so rapid taps don't queue up.
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(clean)
  utter.lang = lang
  const voice = pickVoice(lang)
  if (voice) utter.voice = voice
  // Slightly slower than default so learners can follow each syllable.
  utter.rate = 0.9
  window.speechSynthesis.speak(utter)
}

// ── Per-language text preparation ────────────────────────────────────────

// Headwords like "a/an" or "break up (with someone)" carry notation the
// voice would read aloud literally ("slash", or the usage note).
export function englishSpeechText(text: string) {
  return text
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\s*\/\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Dictionary readings include usage notes — "こす (みずを～)", "～かい",
// "ございます (かん)". Strip those so only the word itself is spoken.
function stripJapaneseNotation(text: string) {
  return text
    .replace(/[(（][^)）]*[)）]/g, '')
    .replace(/[～〜~]/g, '')
    .trim()
}

// Speak the kana reading rather than the kanji: a kanji-only string such as
// 一日 or 上手 has several valid readings and the voice may pick the wrong
// one, while the dataset's reading is the one the card teaches.
export function japaneseSpeechText(word: { jp: string; reading: string }) {
  return stripJapaneseNotation(word.reading) || stripJapaneseNotation(word.jp)
}

// A lone hiragana は/へ is often voiced as the particles "wa"/"e". The
// katakana form of the same kana is always read with its letter sound.
export function kanaSpeechText(kana: string) {
  return kana.replace(/[ぁ-ゖ]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) + 0x60),
  )
}

// Kanji readings come as "ひと.つ" (okurigana after the dot) or "-り"
// (affix markers). Drop the markers to get a speakable word.
export function kanjiReadingSpeechText(reading: string) {
  return reading.replace(/[.\-]/g, '')
}

// Single characters with more than one reading. Spoken alone, the voice
// uses its default reading, which is not always the one the card shows,
// so we speak an unambiguous homophone instead (same syllable and tone).
const CHINESE_HOMOPHONES: Record<string, string> = {
  '都|dōu': '兜',
  '地|de': '的',
  '得|de': '的',
  '长|cháng': '常',
  '还|hái': '孩',
  '差|chà': '岔',
  '朝|cháo': '潮',
  '累|lèi': '泪',
  '种|zhǒng': '肿',
  '只|zhǐ': '纸',
  '行|xíng': '形',
  '重|zhòng': '众',
  '觉|jué': '决',
  '为|wèi': '位',
  '数|shù': '树',
  '教|jiāo': '交',
  '好|hào': '号',
  '少|shào': '哨',
  '干|gàn': '赣',
  '发|fà': '珐',
  '便|pián': '骈',
  '要|yāo': '腰',
  '当|dàng': '荡',
}

export function chineseSpeechText(word: { zh: string; pinyin: string }) {
  return CHINESE_HOMOPHONES[`${word.zh}|${word.pinyin}`] ?? word.zh
}
