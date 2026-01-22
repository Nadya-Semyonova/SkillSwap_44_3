import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { IInput } from './types';
import styles from './Input.module.css';

export function Input({ title, placeholder = '', onChange }: IInput) {
  const [value, setValue] = useState('');
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={styles.inputContainer}>
      {title && (
        <label htmlFor={inputId} className={styles.label}>
          {title}
        </label>
      )}
      <input
        id={inputId}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
