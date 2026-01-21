export interface SelectorProps {
  title?: string;
  placeholder?: string;
  children: React.ReactNode;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
  onChange?: (value: unknown) => void;
}
