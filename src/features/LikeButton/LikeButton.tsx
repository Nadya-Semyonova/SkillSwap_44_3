import style from './LikeButton.module.css';
import LikeBlack from '@/shared/assets/images/IconsSvg/LikeBlack';
import type { IUser } from '@/types/types';
import useLikeButton from './libs/useLikeButton';

export default function LikeButton({ user }: { user: IUser }) {
  const { isLiked, likeCount, handleLikeClick, auth } = useLikeButton({ user });

  return (
    <div className={style.buttonLike}>
      <button
        type="button"
        className={`${style.like} ${isLiked ? style.liked : ''}`}
        onClick={handleLikeClick}
        aria-label={isLiked ? 'Удалить из избранного' : 'Добавить в избранное'}
        disabled={!auth}
      >
        <LikeBlack isActive={isLiked} />
      </button>
      {likeCount > 0 && <span className={style.likeCount}>+{likeCount}</span>}
    </div>
  );
}
