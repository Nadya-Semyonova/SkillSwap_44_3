import { useState } from 'react';
import type { ChangeEvent } from 'react';
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
}: IInput) {
  const [internalValue, setInternalValue] = useState('');
  const value = externalValue !== undefined ? externalValue : internalValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (externalValue === undefined) {
      setInternalValue(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  const inputId = `input-${title?.replace(/\s+/g, '-').toLowerCase() || 'field'}`;

  return (
    <div className={`${styles.inputContainer} ${className}`}>
      {title && (
        <label htmlFor={inputId} className={styles.label}>
          {title}
        </label>
      )}
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
    </div>
  );
}
