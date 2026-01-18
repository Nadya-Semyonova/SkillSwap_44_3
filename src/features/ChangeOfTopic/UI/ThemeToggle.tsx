/* eslint-disable react/require-default-props */
import Moon from '../../../../public/img/IconsSvg/Moon';
import styles from './ThemeToggle.module.css';

export interface ThemeToggleProps {
  className?: string;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
}

export default function ThemeToggle({ className = '', onClick }: ThemeToggleProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      onClick={handleClick}
      aria-label="Сменить тему"
      title="Сменить тему (функционал в разработке)"
    >
      <div className={styles.iconContainer}>
        <Moon />
      </div>
    </button>
  );
}
