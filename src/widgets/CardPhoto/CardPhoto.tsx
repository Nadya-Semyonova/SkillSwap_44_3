import LikeBlack from '@public/img/IconsSvg/LikeBlack';
import Share from '@public/img/IconsSvg/Share';
import MoreSquare from '@public/img/IconsSvg/MoreSquare';
import { useState } from 'react';
import { useLikeCounter } from '@/shared/lib/hooks/useLikeCounter';
import type { IUser } from '@/types/types';
import ButtonDefault from '@/shared/ui/ButtonDefault';
import styles from './CardPhoto.module.css';

interface CardPhotoProps {
  user: IUser;
  onLike?: (userId: number, liked: boolean) => void;
  onShare: (userId: number) => void;
  onMoreDetails: (userId: number) => void;
  onExchange?: (userId: number) => void;
  isOwner?: boolean;
  requestSent?: boolean;
}

export default function CardPhoto({
  user,
  onLike,
  onShare,
  onMoreDetails,
  onExchange,
  isOwner = false,
  requestSent = false,
}: CardPhotoProps) {
  const { likeCount, isLiked, handleLikeClick } = useLikeCounter({
    initialLikes: user.liked || 0,
    onLikeClick: () => {
      onLike?.(user.id, !isLiked);
    },
  });

  const suggestionSkill = user.card_people;

  const [isRequestSent, setIsRequestSent] = useState(requestSent);

  const handleExchangeClick = () => {
    if (isRequestSent) return;

    setIsRequestSent(true);

    if (onExchange) {
      onExchange(user.id);
    } else {
      onMoreDetails(user.id);
    }
  };

  return (
    <div className={styles.skillExchangeCard}>
      <div className={styles.actionSection}>
        <button
          type="button"
          className={`${styles.sectionButton} ${isLiked ? styles.liked : ''}`}
          onClick={handleLikeClick}
          aria-label={isLiked ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          <div className={styles.sectionIcon}>
            <LikeBlack isActive={isLiked} />
          </div>
          {likeCount > 0 && <span className={styles.likeCount}>{likeCount}</span>}
        </button>

        <button
          type="button"
          className={styles.sectionButton}
          onClick={() => onShare(user.id)}
          aria-label="Поделиться информацией о профиле"
        >
          <div className={styles.sectionIcon}>
            <Share />
          </div>
        </button>

        <button
          type="button"
          className={styles.sectionButton}
          onClick={() => onMoreDetails(user.id)}
          aria-label="Посмотреть детали профиля"
        >
          <div className={styles.sectionIcon}>
            <MoreSquare />
          </div>
        </button>
      </div>

      <div className={styles.skillInfoSection}>
        <div className={styles.descriptionSection}>
          <div className={styles.descriptionWrapper}>
            <div className={styles.contentContainer}>
              <div className={styles.header}>
                <h1 className={styles.skillTitle}>{suggestionSkill.skill}</h1>
                <h3 className={styles.category}>
                  {suggestionSkill.category} / {suggestionSkill.subcategory}
                </h3>
                <p className={styles.description}>{suggestionSkill.description}</p>
              </div>
            </div>

            {!isOwner && (
              <div className={styles.exchangeButtonWrapper}>
                <ButtonDefault
                  name={isRequestSent ? 'Обмен предложен' : 'Предложить обмен'}
                  handleClick={handleExchangeClick}
                  styleButton={
                    isRequestSent ? styles.exchangeButtonDisabled : styles.exchangeButtonCustom
                  }
                />
              </div>
            )}
          </div>
        </div>
        <div>Здесь будет фото-карусель</div>
      </div>
    </div>
  );
}

CardPhoto.defaultProps = {
  onLike: undefined,
  onExchange: undefined,
  isOwner: false,
  requestSent: false,
};
