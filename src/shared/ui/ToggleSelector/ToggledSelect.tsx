import { useState, useRef, useEffect } from 'react';
import ChevronDown from '@/shared/assets/images/IconsSvg/ChevronDown';
import ChevronUp from '@/shared/assets/images/IconsSvg/ChevronUp';
import type { SelectorProps } from './types/types';
import styles from './ToggledSelect.module.css';

function ToggledSelect({ title, placeholder, children }: SelectorProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  // Генерация уникального id для кнопки
  const buttonId = `toggled-select-${Math.random().toString(36).substr(2, 9)}`;

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={selectorRef} className={styles.selectorContainer}>
      <label className={styles.label} htmlFor={buttonId}>
        {title}
      </label>

      <button
        type="button"
        id={buttonId}
        className={styles.selectorWrapper}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className={styles.selectorContent}>
          <span className={styles.placeholder}>{placeholder}</span>
          <span className={styles.iconWrapper}>{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
        </div>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu} role="listbox" aria-labelledby={buttonId}>
          <div className={styles.dropdownContent}>{children}</div>
        </div>
      )}
    </div>
  );
}

export default ToggledSelect;
