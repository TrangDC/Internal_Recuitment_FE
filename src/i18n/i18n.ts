import { initReactI18next } from 'react-i18next'
import en from './en/resource.json'
import vi from './vi/resource.json'
import i18next from 'i18next'
export const LANGUAGES = {
  EN: 'en',
  VI: 'vi',
}
const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
}

i18next.use(initReactI18next).init({
  resources,
  lng: LANGUAGES.VI,
  fallbackLng: LANGUAGES.VI,
  interpolation: { escapeValue: false },
})

export default i18next
