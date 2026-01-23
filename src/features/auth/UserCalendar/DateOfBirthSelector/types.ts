import type { InputHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

export type DateInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onClick'> & {
  onClick?: MouseEventHandler<HTMLElement>; // <-- вот тут
};

export type TCalendarContainer = {
  children: ReactNode;
  className?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export type TDateOfBirthSelectorProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  id?: string;
};
