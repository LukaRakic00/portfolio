'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'sr'

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  translate: (text: string) => Promise<string>
  t: (text: string) => string
  translations: Record<string, string>
  isLoading: boolean
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [translations, setTranslations] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load language from localStorage
    const savedLang = localStorage.getItem('portfolio-language') as Language
    if (savedLang && (savedLang === 'en' || savedLang === 'sr')) {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('portfolio-language', lang)
    // Data will be refetched automatically via useEffect in components
  }

  const translate = async (text: string): Promise<string> => {
    // Not used anymore - data comes from static files
    return text
  }

  const t = (text: string): string => {
    // Not used anymore - data comes from static files
    return text
  }

  return (
    <TranslationContext.Provider
      value={{
        language,
        setLanguage,
        translate,
        t,
        translations,
        isLoading,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}

