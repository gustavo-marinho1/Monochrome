import { createContext, useState, useEffect, type ReactNode } from 'react';
import { DARK, LIGHT } from '../lib/theme';

const ThemeContext = createContext({
  toggleTheme: () => {},
  isDark: false
});

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  });

  const [isDark, setIsDark] = useState(theme === DARK);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === DARK) {
      root.classList.add(DARK);
      setIsDark(true);
    } else {
      root.classList.remove(DARK);
      setIsDark(false);
    }
    theme === DARK ? root.classList.add(DARK) : root.classList.remove(DARK);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === LIGHT ? DARK : LIGHT));

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
export { ThemeContext };