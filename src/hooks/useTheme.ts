import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Verifica se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    // Verifica a preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Retorna o tema salvo ou a preferência do sistema
    return savedTheme || (prefersDark ? 'dark' : 'light');
  });

  useEffect(() => {
    // Salva o tema no localStorage
    localStorage.setItem('theme', theme);
    
    // Aplica a classe ao elemento html
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return { theme, setTheme };
} 