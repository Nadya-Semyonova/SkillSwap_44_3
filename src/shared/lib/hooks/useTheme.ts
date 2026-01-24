import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    // проверка темы на устройстве НЕ ДОДЕЛАНО
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });
  // меняем тему
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    // сохроняем
    localStorage.setItem('theme', theme);
  }, [theme]);

  // меняем тему
  const switchTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return {
    theme, // дефолт
    switchTheme,
    isDark: theme === 'dark', // true если тёмный
  };
};
