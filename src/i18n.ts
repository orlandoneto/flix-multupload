import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

// Caminho para os arquivos de tradução
const backendOptions = {
    loadPath: '/src/locales/{{lng}}/translation.json',
};

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'pt-BR',
        supportedLngs: ['pt-BR', 'en-US', 'es-ES'],
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
        },
        backend: backendOptions,
        react: {
            useSuspense: false,
        },
    });

export default i18n; 