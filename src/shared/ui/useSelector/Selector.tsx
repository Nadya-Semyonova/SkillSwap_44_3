// src/shared/ui/useSelector/Selector.tsx

import React, { useState, useRef, useEffect } from 'react';
import ChevronDown from '@public/img/IconsSvg/ChevronDown';
import ChevronUp from '@public/img/IconsSvg/ChevronUp';
import type { SelectorProps } from './types/selector.types';
import styles from './Selector.module.css';

function Selector({
  title,
  placeholder,
  children,
  disabled = false,
  error,
  required = false,
  id,
  className = '',
  isOpen: controlledOpen,
  onToggle,
  onChange,
}: SelectorProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  const dropdownId = `dropdown-${id || Math.random().toString(36).substr(2, 9)}`;

  const isControlled = controlledOpen !== undefined;
  const currentOpenState = isControlled ? controlledOpen : isOpen;

  const toggleDropdown = () => {
    if (disabled) return;

    if (isControlled && onToggle) {
      onToggle();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (value: unknown) => {
    if (onChange) {
      onChange(value);
    }

    if (!isControlled) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        if (currentOpenState && !isControlled) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [currentOpenState, isControlled]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown();
    }
  };

  return (
    <div
      ref={selectorRef}
      className={`${styles.selectorContainer} ${className}`}
      role="combobox"
      aria-expanded={currentOpenState}
      aria-haspopup="listbox"
      aria-controls={dropdownId}
    >
      {title && (
        <label htmlFor={id} className={styles.label}>
          {title}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}

      <div
        className={`${styles.selectorWrapper} ${disabled ? styles.disabled : ''} ${error ? styles.error : ''}`}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={currentOpenState}
        aria-controls={dropdownId}
      >
        <div className={styles.selectorContent}>
          <span className={styles.placeholder}>{placeholder || 'Выберите значение'}</span>
          <span
            className={styles.iconWrapper}
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDropdown();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Toggle dropdown"
          >
            {currentOpenState ? <ChevronUp /> : <ChevronDown />}
          </span>
        </div>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {currentOpenState && (
        <div id={dropdownId} className={styles.dropdownMenu} role="listbox">
          <div className={styles.dropdownContent}>
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  onClick: (e: React.MouseEvent) => {
                    if (child.props.onClick) {
                      child.props.onClick(e);
                    }
                    handleOptionClick(child.props.value);
                  },
                  className: `${child.props.className || ''} ${styles.option}`,
                });
              }
              return child;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Selector;
