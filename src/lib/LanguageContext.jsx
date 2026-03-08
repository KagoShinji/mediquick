import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/i18n';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const [language, setLanguageState] = useState(() => {
        return localStorage.getItem('medicare_language') || 'en';
    });

    const setLanguage = (lang) => {
        setLanguageState(lang);
        localStorage.setItem('medicare_language', lang);
    };

    // t(key) — returns translated string, falls back to English if key missing
    const t = (key) => {
        const langMap = translations[language] || translations['en'];
        return langMap[key] ?? translations['en'][key] ?? key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
    return ctx;
}
