import ButtonDefault from '@shared/ui/ButtonDefault';
import Done from '@public/img/IconsSvg/Done';
import Modal from './Modal';
import styles from './Modal.module.css';
import type { InfoModalProps } from './types';

function InfoModal({ isOpen, onClose, title, message, onConfirm }: InfoModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <div className={styles.iconWrapper}>
          <Done />
        </div>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalMessage}>{message}</p>
        <ButtonDefault name="Готово" handleClick={handleConfirm} styleButton={styles.modalButton} />
      </div>
    </Modal>
  );
}

export default InfoModal;
