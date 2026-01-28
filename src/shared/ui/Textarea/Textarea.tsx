import { useState, useRef, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import type { ITextarea } from './types';
import styles from './Textarea.module.css';

// Регулярное выражение для проверки, что поле не пустое и не состоит только из пробелов
const NOT_EMPTY_OR_WHITESPACE_REGEX = /\S/;

export function Textarea({
  title,
  placeholder = '',
  onChange,
  className = '',
  maxLength,
  value: externalValue,
  disabled = false,
  children,
  errorMessage: externalErrorMessage,
  autoFocus = false,
  required = false,
  requiredErrorMessage = 'Поле не может быть пустым',
}: ITextarea) {
  const [internalValue, setInternalValue] = useState('');
  const value = externalValue !== undefined ? externalValue : internalValue;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [internalErrorMessage, setInternalErrorMessage] = useState<string>('');

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  const validateField = (fieldValue: string): boolean => {
    if (required && !NOT_EMPTY_OR_WHITESPACE_REGEX.test(fieldValue)) {
      setInternalErrorMessage(requiredErrorMessage);
      return false;
    }
    setInternalErrorMessage('');
    return true;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;

    if (externalValue === undefined) {
      setInternalValue(newValue);
    }

    if (required) {
      validateField(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  const textareaId = `textarea-${title?.replace(/\s+/g, '-').toLowerCase() || 'field'}`;

  const errorMessage = externalErrorMessage || internalErrorMessage;

  const textareaClassName = `${styles.textarea} ${
    disabled ? styles.textareaDisabled : ''
  } ${errorMessage ? styles.textareaError : ''}`;

  const handleBlur = () => {
    if (required) {
      validateField(value);
    }
  };

  const renderTextarea = () => {
    return (
      <textarea
        ref={textareaRef}
        id={textareaId}
        className={textareaClassName}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        aria-label={title || placeholder}
        aria-required={required}
        aria-invalid={errorMessage ? 'true' : 'false'}
        aria-describedby={errorMessage ? `${textareaId}-error` : undefined}
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
          {required && <span className={styles.required}> *</span>}
        </label>
      )}
      {renderTextarea()}
      {errorMessage && (
        <div id={`${textareaId}-error`} className={styles.errorMessage} role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
