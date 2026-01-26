import LikeBlack from '@/shared/assets/images/IconsSvg/LikeBlack';
import Share from '@/shared/assets/images/IconsSvg/Share';
import MoreSquare from '@/shared/assets/images/IconsSvg/MoreSquare';
import { useLikeCounter } from '@/shared/lib/hooks/useLikeCounter';
import styles from './CardPhoto.module.css';
import type { CardPhotoProps } from './types/types';

export default function CardPhoto({
  user,
  title,
  showTitle = true, // ← Значение по умолчанию true
  onLike,
  onShare,
  onMoreDetails,
  buttons,
  children,
}: CardPhotoProps) {
  const { likeCount, isLiked, handleLikeClick } = useLikeCounter({
    initialLikes: user.liked || 0,
    onLikeClick: () => {
      onLike?.(user.id, !isLiked);
    },
  });

  const suggestionSkill = user.card_people;

  return (
    <>
      {/* Условный рендеринг заголовка */}
      {showTitle && title && <h1 className={styles.cardTitle}>{title}</h1>}
      <div className={styles.skillExchangeCard}>
        <div className={styles.actionSection}>
          <button
            type="button"
            className={`${styles.sectionButton} ${isLiked ? styles.liked : ''}`}
            onClick={handleLikeClick}
            aria-label={isLiked ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            <LikeBlack isActive={isLiked} />
            {likeCount > 0 && <span className={styles.likeCount}>+{likeCount}</span>}
          </button>

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

        <div className={styles.contentSection}>
          <div className={styles.textSection}>
            <h1 className={styles.skillTitle}>{suggestionSkill.skill}</h1>
            <h3 className={styles.category}>
              {suggestionSkill.category} / {suggestionSkill.subcategory}
            </h3>
            <p className={styles.description}>{suggestionSkill.description}</p>
            {buttons && <div className={styles.buttonsWrapper}>{buttons}</div>}
          </div>

          <div className={styles.photoSection}>{children}</div>
        </div>
      </div>
    </>
  );
}
