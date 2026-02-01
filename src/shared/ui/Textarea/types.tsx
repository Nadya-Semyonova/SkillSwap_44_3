export interface ITextarea {
  title?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  value?: string;
  type?: 'text';
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  rows?: number;
  children?: React.ReactNode;
  errorMessage?: string;
  autoFocus?: boolean;
  required?: boolean;
  requiredErrorMessage?: string;
  textareaClassName?: string;
}
