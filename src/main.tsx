import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Verifica o tema salvo ou a preferência do sistema
const getInitialTheme = (): string => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Aplica o tema ao elemento HTML
const theme = getInitialTheme();
document.documentElement.classList.add(theme);

createRoot(document.getElementById("root")!).render(<App />);
