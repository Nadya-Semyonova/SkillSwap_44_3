import React, { useState, useRef } from 'react';
import ArrowDown from '@public/img/IconsSvg/ArrowDown';
import { useCities } from '@shared/lib/hooks/useCities';
import { useFilteredCities } from '@shared/lib/hooks/useFilteredCities';
import { useClickOutside } from '@shared/lib/hooks/useClickOutside';
import styles from './UserSelectorModal.module.css';
import type { ICity } from '@/types/types';

interface CitySelectorProps {
  selectedCity: ICity | null;
  onSelect: (city: ICity | null) => void;
}

function CitySelector({ selectedCity, onSelect }: CitySelectorProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cities, loading, error } = useCities();

  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCities = useFilteredCities(cities, searchTerm);

  useClickOutside({
    ref: wrapperRef,
    handler: () => setIsOpen(false),
  });

  const handleCitySelect = (city: ICity) => {
    onSelect(city);
    setSearchTerm(city.name);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (!isOpen) {
      setIsOpen(true);
    }

    if (value === '') {
      onSelect(null);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onSelect(null);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, city: ICity) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCitySelect(city);
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

  const showArrow = !searchTerm;

  if (loading) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Город</h3>
        <div className={`${styles.searchWrapper} ${isOpen ? styles.searchWrapperOpen : ''}`}>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Загрузка городов..."
            disabled
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${styles.cityContainer}`} ref={wrapperRef}>
      <h3 className={styles.title}>Город</h3>
      <div className={`${styles.searchWrapper} ${isOpen ? styles.searchWrapperOpen : ''}`}>
        <input
          ref={inputRef}
          type="text"
          className={`${styles.searchInput} ${isOpen ? styles.searchInputOpen : ''}`}
          placeholder="Выберите город"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={handleInputClick}
        />

        {showArrow && (
          <button
            className={`${styles.arrowButton} ${isOpen ? styles.arrowButtonOpen : ''}`}
            onClick={handleArrowClick}
            onKeyDown={handleArrowKeyDown}
            type="button"
            aria-label={isOpen ? 'Скрыть список городов' : 'Показать список городов'}
            aria-expanded={isOpen}
          >
            <ArrowDown />
          </button>
        )}

        {searchTerm && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
            type="button"
            aria-label="Очистить выбор города"
          >
            ×
          </button>
        )}

        {isOpen && filteredCities.length > 0 && (
          <div className={styles.dropdown}>
            {filteredCities.map((city) => (
              <button
                key={city.id}
                className={`${styles.dropdownItem} ${
                  selectedCity?.id === city.id ? styles.dropdownItemSelected : ''
                }`}
                onClick={() => handleCitySelect(city)}
                onKeyDown={(e) => handleKeyDown(e, city)}
                type="button"
                role="option"
                aria-selected={selectedCity?.id === city.id}
              >
                {city.name}
              </button>
            ))}
          </div>
        )}

        {isOpen && filteredCities.length === 0 && searchTerm && (
          <div className={styles.dropdown}>
            <div className={styles.dropdownNoResults}>Город не найден</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CitySelector;
