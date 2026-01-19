import Moon from '../../../../public/img/IconsSvg/Moon';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  return (
    <button
      type="button"
      className={styles.button}
      aria-label="Сменить тему"
      title="Сменить тему (функционал в разработке)"
    >
      <Moon />
    </button>
  );
}
