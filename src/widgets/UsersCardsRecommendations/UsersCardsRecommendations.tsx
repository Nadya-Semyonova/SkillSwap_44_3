/* eslint-disable react/require-default-props */

import { useSelector } from '@store/store';

import Card from '../Card/Card';
import type { CardUser } from '../Card/types';
import type { IUser } from '@/types/types';

// eslint-disable-next-line import/extensions

import styles from './UsersCardsRecommendations.module.css';
// eslint-disable-next-line import/extensions
import ButtonAllSkills from '@/shared/ui/ButtonAllSkills';

interface UsersCardsRecommendationsProps {
  title: string;
  onViewAll?: () => void;
  onDetailsClick?: (userId: number) => void; // Для кнопки "Подробнее"
  onLikeClick?: (userId: number) => void; // Для лайков
  className?: string;
  maxCards?: number; // Ограничение количества карточек
}

// Функция конвертации IUser → CardUser может вынести в утилиты?
const convertIUserToCardUser = (user: IUser): CardUser => ({
  id: user.id,
  liked: user.liked,
  avatar: user.avatar,
  name: user.name,
  city: user.city,
  age: user.age,
  about: user.about,
  card_people: user.card_people,
  skill_off: user.skill_off,
});

export default function UsersCardsRecommendations({
  title,
  onViewAll,
  onDetailsClick,
  onLikeClick,
  className = '',
  maxCards = 3,
}: UsersCardsRecommendationsProps) {
  const { users, loading, error } = useSelector((state) => state.users);

  // Хэндлеры для будущей логики кнопки и лайка
  const defaultHandleDetails = (userId: number) => {
    console.log(`Подробнее о пользователе #${userId}`);
  };

  const defaultHandleLike = (userId: number) => {
    console.log(`Лайк для пользователя #${userId}`);
  };

  // Обработка состояний загрузки
  if (loading) {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.loading}>Загрузка пользователей...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.error}>Ошибка: {error}</div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <p className={styles.empty}>Нет пользователей для отображения</p>
      </div>
    );
  }

  // Конвертируем и ограничиваем количество карточек
  const cardUsers = users.slice(0, maxCards || users.length).map(convertIUserToCardUser);

  return (
    <section className={`${styles.container} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {onViewAll && (
          <ButtonAllSkills
            onClick={onViewAll}
            className={styles.viewAllButton}
            text="Смотреть все"
          />
        )}
      </div>

      <div className={styles.cardsGrid}>
        {cardUsers.map((user) => (
          <Card
            key={user.id}
            user={user}
            onDetailsClick={() =>
              onDetailsClick ? onDetailsClick(user.id) : defaultHandleDetails(user.id)
            }
            onLikeClick={() => (onLikeClick ? onLikeClick(user.id) : defaultHandleLike(user.id))}
          />
        ))}
      </div>
    </section>
  );
}
