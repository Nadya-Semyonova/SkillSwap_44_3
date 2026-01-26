export interface ITextarea {
  title?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  value?: string;
  type?: 'text';
  disabled?: boolean;
  maxLength?: number;
  children?: React.ReactNode;
}
