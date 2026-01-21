/* eslint-disable react/require-default-props */

import styles from './ButtonAllSkills.module.css';
import ChevronDown from '../../../../public/img/IconsSvg/ChevronDown';

export interface ButtonAllSkillsProps {
  onClick?: () => void;
  className?: string;
  text?: string; // Добавляем пропс для текста
}

export default function ButtonAllSkills({
  onClick,
  className = '',
  text = 'Все навыки', // Значение по умолчанию
}: ButtonAllSkillsProps) {
  return (
    <button
      type="button"
      className={`${styles.allskillsButton} ${className}`}
      onClick={onClick}
      aria-label={text}
    >
      {text}
      <div>
        <ChevronDown />
      </div>
    </button>
  );
}
