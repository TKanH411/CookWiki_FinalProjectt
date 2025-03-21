import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from '@/locales/en/translation.json'
import translationVI from '@/locales/vi/translation.json'

const resources = {
    en: {translation: translationEN},
    vi: {translation: translationVI},
}

i18n.use(Backend) // Load ngôn ngữ từ file JSON
    .use(LanguageDetector) // Phát hiện ngôn ngữ trình duyệt
    .use(initReactI18next) // Kết nối với React
    .init({
        fallbackLng: 'en', // Ngôn ngữ mặc định
        debug: true, // Bật debug để kiểm tra lỗi
        interpolation: {
            escapeValue: false, // Không escape ký tự đặc biệt
        },
        resources: resources
    });

export default i18n;
