import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import vi from './vi.json'

export type AppLanguage = 'en' | 'vi'

const STORAGE_KEY = 'app-language'

function detectLanguage(): AppLanguage {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'vi') return stored
  } catch {
    // localStorage may be unavailable — fall through to the default
  }
  return 'en'
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: detectLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng)
  } catch {
    // localStorage may be unavailable — the choice just won't persist
  }
})

export default i18n
