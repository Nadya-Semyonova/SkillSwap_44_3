import { type ReactNode } from 'react';

export interface ModalWithOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
