import React, { useState, useEffect, ReactNode } from 'react';
import { IntlProvider as BaseIntlProvider } from 'react-intl';

// Type assertion to fix React 18 compatibility issue
const IntlProvider = BaseIntlProvider as any;

// Define available locales
export type Locale = 'en' | 'es' | 'fr';

// For now, we'll use an empty messages object since messages are defined at component level
// In a real app, you would aggregate all messages here or load them dynamically
const messages: Record<Locale, Record<string, string>> = {
  en: {},
  es: {}, // Add Spanish translations when ready
  fr: {}, // Add French translations when ready
};

interface LocaleProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ 
  children, 
  defaultLocale = 'en', 
}) => {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // Detect browser language and set locale accordingly
    const browserLang = navigator.language.split('-')[0];
    const supportedLocale = Object.keys(messages).includes(browserLang) 
      ? browserLang as Locale 
      : defaultLocale;
    setLocale(supportedLocale);
    
    // Store locale preference in localStorage
    localStorage.setItem('preferred-locale', supportedLocale);
  }, [defaultLocale]);

  // Load saved locale preference
  useEffect(() => {
    const savedLocale = localStorage.getItem('preferred-locale') as Locale;
    if (savedLocale && Object.keys(messages).includes(savedLocale)) {
      setLocale(savedLocale);
    }
  }, []);

  return (
    <IntlProvider 
      locale={locale} 
      messages={messages[locale]}
      defaultLocale={defaultLocale}
    >
      {children}
    </IntlProvider>
  );
};

// Export a context for locale management if needed in the future
export const LocaleContext = React.createContext<{
  locale: Locale;
  changeLocale: (locale: Locale) => void;
} | null>(null);

// Enhanced LocaleProvider with context
export const LocaleProviderWithContext: React.FC<LocaleProviderProps> = ({ 
  children, 
  defaultLocale = 'en', 
}) => {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    const supportedLocale = Object.keys(messages).includes(browserLang) 
      ? browserLang as Locale 
      : defaultLocale;
    setLocale(supportedLocale);
    localStorage.setItem('preferred-locale', supportedLocale);
  }, [defaultLocale]);

  useEffect(() => {
    const savedLocale = localStorage.getItem('preferred-locale') as Locale;
    if (savedLocale && Object.keys(messages).includes(savedLocale)) {
      setLocale(savedLocale);
    }
  }, []);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('preferred-locale', newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      <IntlProvider 
        locale={locale} 
        messages={messages[locale]}
        defaultLocale={defaultLocale}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};