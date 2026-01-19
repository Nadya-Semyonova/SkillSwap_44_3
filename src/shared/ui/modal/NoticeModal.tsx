import ButtonDefault from '@shared/ui/ButtonDefault';
import Notification from '@public/img/IconsSvg/Notification';
import Modal from './Modal';
import styles from './Modal.module.css';
import type { NoticeModalProps } from './types';

function NoticeModal({ isOpen, onClose, title, message, onConfirm }: NoticeModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <div className={styles.iconWrapper}>
          <Notification />
        </div>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalMessage}>{message}</p>
        <ButtonDefault name="Готово" handleClick={handleConfirm} styleButton={styles.modalButton} />
      </div>
    </Modal>
  );
}

export default NoticeModal;
