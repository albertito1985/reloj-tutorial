import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(HttpApi)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({ 
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    },
    fallbackLng:"es",
    lng: "es",
    supportedLngs:["es"],

    // keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    },
    detection:{
      order:['cookie','htmlTag','path','localStorage', 'subdomain'],
      caches: ['cookie','localStorage']
  },
    react:{useSuspense:true}
  });

export default i18n;