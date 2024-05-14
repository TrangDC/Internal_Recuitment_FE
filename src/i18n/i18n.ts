import { initReactI18next } from 'react-i18next'
import en from './en/resource.json'
import vi from './vi/resource.json'
import i18next from 'i18next'
import { handleLocalStorage } from 'shared/utils/utils'
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

const { getStatusByKey } = handleLocalStorage();
const langDefault = getStatusByKey('settings')?.lang;

i18next.use(initReactI18next).init({
  resources,
  lng: langDefault ||LANGUAGES.VI,
  fallbackLng: langDefault || LANGUAGES.VI,
  interpolation: { escapeValue: false },
})

export default i18next
