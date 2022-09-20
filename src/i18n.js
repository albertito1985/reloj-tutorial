import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
.use(LanguageDetector)
.use (initReactI18next)
.use(HttpApi)
.init({
  debug: true,
  supportedLngs: [ 'es', 'en','sv'],
  fallbackLng: "es",
  ns:'translation',
  defaultNS:'translation',
  detection: {
      order: ['path','cookie', 'htmlTag','localStorage','subdomain'],
      caches: ['cookie','localStorage'],
    },
    backend: {
        loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    react:{
        useSuspense:true,
    }
})
export default i18n;