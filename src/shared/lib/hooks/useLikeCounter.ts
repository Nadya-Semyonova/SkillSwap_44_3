import { useState } from 'react';

interface UseLikeCounterProps {
  initialLikes: number;
  onLikeClick?: () => void;
}

export const useLikeCounter = ({ initialLikes, onLikeClick }: UseLikeCounterProps) => {
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    const newLikedState = !isLiked;
    const countChange = newLikedState ? 1 : -1;

    setIsLiked(newLikedState);
    setLikeCount((prev) => Math.max(0, prev + countChange));

    onLikeClick?.();
  };

  return {
    likeCount,
    isLiked,
    handleLikeClick,
  };
};
