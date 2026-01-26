import Moon from '@/shared/assets/images/IconsSvg/Moon';
import styles from './ThemeToggle.module.css';
import { useTheme } from '@/shared/lib/hooks/useTheme';

export default function ThemeToggle() {
  const { switchTheme } = useTheme();

  return (
    <button
      type="button"
      className={styles.button}
      aria-label="Сменить тему"
      title="Сменить тему"
      onClick={switchTheme}
    >
      <Moon />
    </button>
  );
}
