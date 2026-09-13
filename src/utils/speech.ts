export function speak(text: string, lang: string) {
  if (!window.speechSynthesis) return
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = lang
  window.speechSynthesis.speak(utter)
}
