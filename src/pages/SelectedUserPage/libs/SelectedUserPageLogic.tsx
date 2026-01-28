import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, type RootState } from '@/store/store';

export default function useSelectedUserPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExchangeSent, setIsExchangeSent] = useState(false);
  const { id } = useParams();
  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const usersData = useSelector((state: RootState) => state.users.users);
  const userSelected = usersData?.find((user) => user.id === Number(id));

  // Обработчики
  const handleLikeClick = (userId?: number, isLiked?: boolean) => {
    console.log(`Like clicked for user ${userId}, liked: ${isLiked}`);
  };

  const handleShareClick = (userId?: number) => {
    console.log(`Share clicked for user ${userId}`);
  };

  const handleMoreDetails = (userId?: number) => {
    console.log(`More details clicked for user ${userId}`);
  };

  const handleExchangeClick = () => {
    if (!currentUser) {
      navigate('/Login');
      return;
    }
    if (isExchangeSent) return; // предотвращаем повторное открытие
    setIsExchangeSent(true); // сразу меняем кнопку
    setIsModalOpen(true); // открываем модалку
  };

  const handleModalConfirm = () => {
    console.log('Модалка подтверждена');
    setIsModalOpen(false);
  };

  return {
    userSelected,
    usersData,
    isModalOpen,
    isExchangeSent,
    handleLikeClick,
    handleShareClick,
    handleMoreDetails,
    handleExchangeClick,
    handleModalConfirm,
    setIsModalOpen,
  };
}
