import ButtonDefault from '@shared/ui/ButtonDefault';
import Notification from '@public/img/IconsSvg/Notification';
import styles from '../style/ModalChildrenStyle.module.css';
import type { ChildrenModalProps } from '@/types/types';

function NoticeModal({ title, message, onConfirm }: ChildrenModalProps) {
  return (
    <div className={styles.modalContent}>
      <div className={styles.iconWrapper}>
        <Notification />
      </div>
      <div className={styles.modalControl}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalMessage}>{message}</p>
        <ButtonDefault name="Готово" handleClick={onConfirm} styleButton={styles.modalButton} />
      </div>
    </div>
  );
}

export default NoticeModal;
