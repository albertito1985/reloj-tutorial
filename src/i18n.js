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
  supportedLngs: [ 'es', 'en','se'],
  fallbackLng: "es",
  ns:['general','elreloj'],
//   defaultNS:['general'],
  detection: {
      order: ['path','cookie', 'htmlTag','localStorage','subdomain'],
      caches: ['cookie','localStorage'],
    },
    backend: {
        loadPath: '/assets/locales/{{lng}}/{{ns}}.json',
    },
    react:{
        useSuspense:true,
    }
})
export default i18n;