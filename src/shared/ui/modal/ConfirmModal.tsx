import ButtonDefault from '@shared/ui/ButtonDefault';
import UserCircle from '@public/img/IconsSvg/UserCircle';
import Modal from './Modal';
import styles from './Modal.module.css';
import type { ConfirmModalProps } from './types';

function ConfirmModal({ isOpen, onClose, title, message, onConfirm }: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <div className={styles.iconWrapper}>
          <UserCircle />
        </div>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalMessage}>{message}</p>
        <ButtonDefault name="Готово" handleClick={handleConfirm} styleButton={styles.modalButton} />
      </div>
    </Modal>
  );
}

export default ConfirmModal;
