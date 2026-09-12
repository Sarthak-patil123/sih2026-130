'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en } from '../i18n/en';
import { mr } from '../i18n/mr';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  toggleLanguage: () => void;
  isMarathi: boolean;
  t: (key: string, fallback?: string) => string;
  plainLanguageMode: boolean;
  setPlainLanguageMode: React.Dispatch<React.SetStateAction<boolean>>;
  togglePlainLanguageMode: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY_LANG = 'mah_portal_language';
const STORAGE_KEY_PLAIN = 'mah_portal_plain_lang';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>('en');
  const [plainLanguageMode, setPlainLanguageMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem(STORAGE_KEY_LANG);
    if (savedLang) setLanguage(savedLang);
    const savedPlain = localStorage.getItem(STORAGE_KEY_PLAIN);
    if (savedPlain !== null) setPlainLanguageMode(savedPlain === 'true');
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY_LANG, language);
    }
  }, [language, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY_PLAIN, String(plainLanguageMode));
    }
  }, [plainLanguageMode, mounted]);

  const dictionary = language === 'mr' ? mr : en;

  const t = (key: string, fallback: string = ''): string => {
    return dictionary[key] || fallback || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'mr' : 'en'));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isMarathi: language === 'mr',
        t,
        plainLanguageMode,
        setPlainLanguageMode,
        togglePlainLanguageMode: () => setPlainLanguageMode(p => !p)
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
