import Card from '@widgets/Card/Card';
import Modal from '@/shared/ui/modal/Modal';
import styles from './SearchModal.module.css';
import type { IUser } from '@/types/types';

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  users: IUser[];
};

function SearchModal({ isOpen, onClose, users = [] }: SearchModalProps) {
  const handleDetailsClick = () => {};

  const handleLikeClick = () => {};

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Найдено пользователей: {users.length}</h3>
          <button className={styles.closeButton} onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        </div>

        {users.length === 0 ? (
          <div className={styles.noResults}>
            <p>Пользователи не найдены</p>
          </div>
        ) : (
          <div className={styles.cardsContainer}>
            {users.map((user) => (
              <div key={user.id} className={styles.cardWrapper}>
                <Card
                  user={user}
                  onDetailsClick={() => handleDetailsClick()}
                  onLikeClick={() => handleLikeClick()}
                  variant="default"
                  showFullName
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default SearchModal;
