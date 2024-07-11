import { useContext } from 'react';
import { ThemeContext } from '../contexts/CustomThemeProvider';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Theme } from '../types/enums';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      {theme == Theme.Light ? <LightModeIcon /> : <DarkModeIcon />}
    </button>
  );
};

export default ThemeToggleButton;
