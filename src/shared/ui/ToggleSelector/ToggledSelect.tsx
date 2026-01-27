import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import ChevronDown from '@/shared/assets/images/IconsSvg/ChevronDown';
import ChevronUp from '@/shared/assets/images/IconsSvg/ChevronUp';
import styles from './ToggledSelect.module.css';

interface ToggledSelectProps {
  title?: string;
  placeholder: string;
  children: ReactNode;
  active?: ReactNode;
}

function ToggledSelect({
  title = '',
  placeholder,
  children,
  active = null,
}: ToggledSelectProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);
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
      {title && (
        <label className={styles.label} htmlFor={buttonId}>
          {title}
        </label>
      )}

      <button
        type="button"
        id={buttonId}
        className={styles.selectorWrapper}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <div className={styles.selectorContent}>
          <span className={styles.placeholder}>{active || placeholder}</span>
          <span className={styles.iconWrapper}>{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
        </div>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.dropdownContent}>{children}</div>
        </div>
      )}
    </div>
  );
}

export default ToggledSelect;
