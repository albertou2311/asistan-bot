import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeStyles: {
    [key in Theme]: {
      bg: string;
      monitorBg: string;
      text: string;
      border: string;
      accent: string;
    };
  };
}

const themeStyles = {
  light: {
    bg: 'bg-white',
    monitorBg: 'bg-gray-50',
    text: 'text-gray-800',
    border: 'border-gray-200',
    accent: 'bg-blue-50 text-blue-600'
  },
  dark: {
    bg: 'bg-gray-800',
    monitorBg: 'bg-gray-900',
    text: 'text-gray-100',
    border: 'border-gray-700',
    accent: 'bg-gray-700 text-gray-300'
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};