import { useState, useEffect } from 'react';
import type { IUser } from '@/types/types';
import { useDispatch, useSelector, type RootState } from '@/store/store';
import { addUser } from '@/store/slices/profileEditSlice/profileEditSlice';

export default function useLikeButton({ user }: { user: IUser }) {
  const [likeCount, setLikeCount] = useState(user.liked);
  const [isLiked, setIsLiked] = useState(false);
  const [auth, setAuth] = useState(false);
  const favoritesUsers = useSelector((state: RootState) => state.profileEdit.favoritesUsers);
  const userAuth = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const found = favoritesUsers.some((favorite) => favorite.id === user.id);
    setIsLiked(found);

    if (found) {
      setLikeCount(user.liked + 1);
    } else {
      setLikeCount(user.liked);
    }
    if (userAuth) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [favoritesUsers, user.id, user.liked, userAuth]);

  const handleLikeClick = () => {
    dispatch(addUser(user));

    if (isLiked) {
      setLikeCount(user.liked);
      setIsLiked(false);
    } else {
      setLikeCount(user.liked + 1);
      setIsLiked(true);
    }
  };

  return {
    likeCount,
    isLiked,
    handleLikeClick,
    auth,
  };
}
