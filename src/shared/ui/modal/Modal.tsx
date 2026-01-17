import { type ReactNode, useCallback } from 'react';
import Overlay from '../overlay/Overlay';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  const handleOverlayClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={handleModalClick}>
        {children}
      </div>
    </Overlay>
  );
}

export default Modal;
