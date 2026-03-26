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
    setIsModalOpen(false);
  };

  return {
    userSelected,
    usersData,
    isModalOpen,
    isExchangeSent,
    handleExchangeClick,
    handleModalConfirm,
    setIsModalOpen,
  };
}
