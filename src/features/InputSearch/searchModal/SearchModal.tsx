import Card from '@widgets/Card/Card';
import Modal from '@/shared/ui/modal/Modal';
import Cross from '@/shared/assets/images/IconsSvg/Cross';
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
      <div className={`${styles.searchModalContainer} ${isOpen ? styles.open : ''}`}>
        <header className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Найдено пользователей: {users.length}</h3>
          <button className={styles.closeButton} onClick={onClose} aria-label="Закрыть">
            <Cross />
          </button>
        </header>

        {users.length === 0 ? (
          <main className={styles.noResults}>
            <p className={styles.textResults}>Пользователи не найдены</p>
          </main>
        ) : (
          <main className={styles.cardsContainer}>
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
          </main>
        )}
      </div>
    </Modal>
  );
}

export default SearchModal;
