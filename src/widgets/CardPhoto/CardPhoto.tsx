import Share from '@/shared/assets/images/IconsSvg/Share';
import MoreSquare from '@/shared/assets/images/IconsSvg/MoreSquare';
import styles from './CardPhoto.module.css';
import type { CardPhotoProps } from './libs/types';
import LikeButton from '@/features/LikeButton';

export default function CardPhoto({
  user,
  title,
  showTitle = true,
  showActions = true, // Добавляем пропс со значением по умолчанию
  onShare,
  onMoreDetails,
  buttons,
  children,
}: CardPhotoProps) {
  const suggestionSkill = user.card_people;

  return (
    <>
      {/* Условный рендеринг заголовка */}
      {showTitle && title && <h1 className={styles.cardTitle}>{title}</h1>}
      <div className={styles.skillExchangeCard}>
        {/* Условный рендеринг actionSection */}
        {showActions && (
          <div className={styles.actionSection}>
            <LikeButton user={user} />

            <button
              type="button"
              className={styles.sectionButton}
              onClick={() => onShare(user.id)}
              aria-label="Поделиться информацией о профиле"
            >
              <Share />
            </button>

            <button
              type="button"
              className={styles.sectionButton}
              onClick={() => onMoreDetails(user.id)}
              aria-label="Посмотреть детали профиля"
            >
              <MoreSquare />
            </button>
          </div>
        )}

        <div className={styles.contentSection}>
          <div className={styles.textSection}>
            <h1 className={styles.skillTitle}>{suggestionSkill.skill}</h1>
            <h3 className={styles.category}>
              {suggestionSkill.category} / {suggestionSkill.subcategory}
            </h3>
            <p className={styles.description}>{suggestionSkill.description}</p>
            {buttons && <div>{buttons}</div>}
          </div>

          <div className={styles.photoSection}>{children}</div>
        </div>
      </div>
    </>
  );
}
