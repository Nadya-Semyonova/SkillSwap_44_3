import { useEffect, useRef } from 'react';
import styles from './ModalWithOverlay.module.css';
import type { ModalWithOverlayProps } from './types';

function ModalWithOverlay({ isOpen, onClose, children }: ModalWithOverlayProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      role="button"
      tabIndex={-1}
      aria-label="Закрыть модальное окно"
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      }}
    >
      <div ref={modalRef} className={styles.modal}>
        {children}
      </div>
    </div>
  );
}

export default ModalWithOverlay;
