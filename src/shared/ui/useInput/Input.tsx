import { useState } from 'react';
import type { ChangeEvent } from 'react';
import ChevronDown from '@/shared/assets/images/IconsSvg/ChevronDown';
import type { IInput } from '../../../types/types';
import styles from './Input.module.css';

export function Input({
  title,
  placeholder = '',
  onChange,
  className = '',
  value: externalValue,
  type = 'text',
  disabled = false,
  options,
  variant,
}: IInput) {
  const [internalValue, setInternalValue] = useState('');
  const value = externalValue !== undefined ? externalValue : internalValue;

  const isSelect = variant === 'select' || (options && options.length > 0);
  const isTextarea = className.includes('textarea');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;

    if (externalValue === undefined) {
      setInternalValue(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  const inputId = `input-${title?.replace(/\s+/g, '-').toLowerCase() || 'field'}`;

  const renderInput = () => {
    if (isSelect) {
      return (
        <div className={styles.selectWrapper}>
          <select
            id={inputId}
            className={`${styles.input} ${styles.select} ${disabled ? styles.inputDisabled : ''}`}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            aria-label={title || placeholder}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className={styles.selectIcon} aria-hidden="true">
            <ChevronDown />
          </span>
        </div>
      );
    }

    if (isTextarea) {
      return (
        <textarea
          id={inputId}
          className={`${styles.input} ${disabled ? styles.inputDisabled : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          aria-label={title || placeholder}
        />
      );
    }

    return (
      <input
        id={inputId}
        type={type}
        className={`${styles.input} ${disabled ? styles.inputDisabled : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        aria-label={title || placeholder}
      />
    );
  };

  return (
    <div className={`${styles.inputContainer} ${className}`}>
      {title && (
        <label htmlFor={inputId} className={styles.label}>
          {title}
        </label>
      )}
      {renderInput()}
    </div>
  );
}
