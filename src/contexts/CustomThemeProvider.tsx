import { ReactNode, createContext, useEffect, useState } from 'react';
import { Theme } from '../types/enums';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const defaultThemeContextValue: ThemeContextType = {
  theme: Theme.Light,
  toggleTheme: () => {},
};
const ThemeContext = createContext<ThemeContextType>(defaultThemeContextValue);

const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(Theme.Light);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.Light ? Theme.Dark : Theme.Light,
    );
  };

  useEffect(() => {
    if (theme === Theme.Dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { CustomThemeProvider, ThemeContext };
