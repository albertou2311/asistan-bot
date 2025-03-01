import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeSelector = () => {
  const { theme, setTheme, themeStyles } = useTheme();
  const currentTheme = themeStyles[theme];

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-lg transition-all ${
          theme === 'light' 
            ? currentTheme.accent
            : `hover:${currentTheme.accent} ${currentTheme.text}`
        }`}
        title="Light Mode"
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-lg transition-all ${
          theme === 'dark' 
            ? currentTheme.accent
            : `hover:${currentTheme.accent} ${currentTheme.text}`
        }`}
        title="Dark Mode"
      >
        <Moon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ThemeSelector;