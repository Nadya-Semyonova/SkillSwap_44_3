import ChevronRight from '@/shared/assets/images/IconsSvg/ChevronRight';
import styles from './ButtonAllSkills.module.css';

export interface ButtonAllSkillsProps {
  onClick: () => void;
  className: string;
  text: string; // Добавляем пропс для текста
  icon: React.ReactNode;
}

export default function ButtonAllSkills({
  onClick,
  className = '',
  text = 'Все навыки', // Значение по умолчанию
  icon = <ChevronRight />,
}: ButtonAllSkillsProps) {
  return (
    <button
      type="button"
      className={`${styles.allskillsButton} ${className}`}
      onClick={onClick}
      aria-label={text}
    >
      {text}
      <div>{icon}</div>
    </button>
  );
}
