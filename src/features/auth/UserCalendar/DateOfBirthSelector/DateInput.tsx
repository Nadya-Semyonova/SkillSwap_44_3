import { forwardRef, useRef, useImperativeHandle, type ForwardedRef } from 'react';
import CalendarIcon from '@/shared/assets/images/IconsSvg/Calendar';
import styles from './DateOfBirthSelector.module.css';
import type { DateInputProps } from './types';

export const DateInput = forwardRef(
  (props: DateInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      id,
      value,
      onClick,
      onChange,
      onBlur,
      onKeyDown,
      onFocus,
      placeholder,
      name,
      disabled,
    } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
      onClick?.(event as unknown as React.MouseEvent<HTMLInputElement>);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      onKeyDown?.(event);

      if (event.key === ' ' && onClick) {
        event.preventDefault();
        onClick(event as unknown as React.MouseEvent<HTMLElement>);
      }
    };

    const handleIconClick: React.MouseEventHandler<HTMLButtonElement> = () => {
      const input = inputRef.current;
      if (input) {
        input.focus();
        input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    };

    return (
      <div className={`${styles.inputField} ${value ? styles.filled : ''}`}>
        <input
          className={styles.input}
          ref={inputRef}
          id={id}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          name={name}
          disabled={disabled}
          value={props.value || ''}
        />

        <button
          type="button"
          className={styles.icon}
          onClick={handleIconClick}
          aria-label="Открыть календарь"
        >
          <CalendarIcon />
        </button>
      </div>
    );
  }
);
