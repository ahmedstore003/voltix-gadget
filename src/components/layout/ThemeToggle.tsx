'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, mounted } = useTheme();
  const { t } = useLanguage();

  if (!mounted) {
    return (
      <span
        className="inline-flex h-9 w-9 items-center justify-center border border-border bg-muted/50"
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-9 w-9 items-center justify-center border border-border text-foreground hover:bg-muted transition-colors duration-200"
      aria-label={isDark ? t.themeSwitchLight : t.themeSwitchDark}
    >
      {isDark ? (
        <Sun className="h-4 w-4" strokeWidth={1.5} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.5} />
      )}
    </button>
  );
};
