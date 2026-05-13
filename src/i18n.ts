import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: { escapeValue: false },
    resources: {
      en: { translation: { "nav_home": "Home", "nav_articles": "Articles" } },
      es: { translation: { "nav_home": "Inicio", "nav_articles": "Artículos" } },
      de: { translation: { "nav_home": "Startseite", "nav_articles": "Artikel" } },
      fr: { translation: { "nav_home": "Accueil", "nav_articles": "Articles" } }
    }
  });

export default i18n;