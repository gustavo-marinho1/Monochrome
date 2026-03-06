import { Moon, Sun } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme.context';
import { ButtonHeaderAction } from './buttons-header';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <ButtonHeaderAction onClick={() => toggleTheme()}>
      {isDark ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5" />
      )}
    </ButtonHeaderAction>
  );
}