import ButtonDefault from '@shared/ui/ButtonDefault';
import Done from '@public/img/IconsSvg/Done';
import styles from '../style/ModalChildrenStyle.module.css';
import type { ChildrenModalProps } from '@/types/types';

function InfoModal({ title, message, onConfirm }: ChildrenModalProps) {
  return (
    <div className={styles.modalContent}>
      <div className={styles.iconWrapper}>
        <Done />
      </div>
      <div className={styles.modalControl}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalMessage}>{message}</p>
        <ButtonDefault name="Готово" handleClick={onConfirm} styleButton={styles.modalButton} />
      </div>
    </div>
  );
}

export default InfoModal;
