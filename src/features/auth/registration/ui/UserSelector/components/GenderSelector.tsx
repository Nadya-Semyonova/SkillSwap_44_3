import React, { useState, useEffect, useRef } from 'react';
import ArrowDown from '@public/img/IconsSvg/ArrowDown';
import { genders } from './data';
import type { IGender } from '@/types/types';
import styles from './UserSelectorModal.module.css';

interface GenderSelectorProps {
  selectedGender: IGender | null;
  onSelect: (gender: IGender | null) => void;
}

function GenderSelector({ selectedGender, onSelect }: GenderSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleGenderSelect = (gender: IGender) => {
    onSelect(gender);
    setIsOpen(false);
  };

  const handleClear = () => {
    onSelect(null);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, gender: IGender) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleGenderSelect(gender);
    }
  };

  const handleArrowKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
      inputRef.current?.focus();
    }
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleArrowClick = () => {
    setIsOpen((prev) => !prev);
    inputRef.current?.focus();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className={`${styles.container} ${styles.genderContainer}`} ref={wrapperRef}>
      <h3 className={styles.title}>Пол</h3>
      <div className={`${styles.searchWrapper} ${isOpen ? styles.searchWrapperOpen : ''}`}>
        <input
          ref={inputRef}
          type="text"
          className={`${styles.searchInput} ${isOpen ? styles.searchInputOpen : ''}`}
          placeholder="Выберите пол"
          value={selectedGender?.name || ''}
          readOnly
          onClick={handleInputClick}
          onKeyDown={handleInputKeyDown}
        />

        <button
          className={`${styles.arrowButton} ${isOpen ? styles.arrowButtonOpen : ''}`}
          onClick={handleArrowClick}
          onKeyDown={handleArrowKeyDown}
          type="button"
          aria-label={isOpen ? 'Скрыть список полов' : 'Показать список полов'}
          aria-expanded={isOpen}
        >
          <ArrowDown />
        </button>

        {selectedGender && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
            type="button"
            aria-label="Очистить выбор пола"
          >
            ×
          </button>
        )}

        {isOpen && (
          <div className={styles.dropdown}>
            {genders.map((gender) => (
              <button
                key={gender.id}
                className={`${styles.dropdownItem} ${
                  selectedGender?.id === gender.id ? styles.dropdownItemSelected : ''
                }`}
                onClick={() => handleGenderSelect(gender)}
                onKeyDown={(e) => handleKeyDown(e, gender)}
                type="button"
                role="option"
                aria-selected={selectedGender?.id === gender.id}
              >
                {gender.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GenderSelector;
