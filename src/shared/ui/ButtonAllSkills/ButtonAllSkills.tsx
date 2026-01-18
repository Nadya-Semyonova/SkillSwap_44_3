/* eslint-disable react/require-default-props */
import styles from './ButtonAllSkills.module.css';
import ChevronDown from '../../../../public/img/IconsSvg/ChevronDown';

export interface ButtonAllSkillsProps {
  onClick?: () => void;
  className?: string;
}

export default function ButtonAllSkills({ onClick, className = '' }: ButtonAllSkillsProps) {
  return (
    <button
      type="button"
      className={`${styles.allskillsButton} ${className}`}
      onClick={onClick}
      aria-label="Все навыки"
    >
      <span className={styles.SkillsText}>Все навыки</span>
      <div>
        <ChevronDown />
      </div>
    </button>
  );
}
