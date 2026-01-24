import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { ITextarea } from './types';
import styles from './Textarea.module.css';

export function Textarea({
  title,
  placeholder = '',
  onChange,
  className = '',
  maxLength,
  value: externalValue,
  disabled = false,
  children,
}: ITextarea) {
  const [internalValue, setInternalValue] = useState('');
  const value = externalValue !== undefined ? externalValue : internalValue;

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

  const textareaId = `textarea-${title?.replace(/\s+/g, '-').toLowerCase() || 'field'}`;

  const renderTextarea = () => {
    return (
      <textarea
        id={textareaId}
        className={`${styles.textarea} ${disabled ? styles.textareaDisabled : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        aria-label={title || placeholder}
        maxLength={maxLength}
      >
        {children}
      </textarea>
    );
  };
  return (
    <div className={`${styles.textareaContainer} ${className}`}>
      {title && (
        <label htmlFor={textareaId} className={styles.label}>
          {title}
        </label>
      )}
      {renderTextarea()}
    </div>
  );
}
