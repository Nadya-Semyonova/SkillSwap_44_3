/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/extensions */
import Filters from '@widgets/Filters';
import { useDispatch, useSelector } from '@store/store';
import { useFilteredUsers } from '@widgets/Filters/hooks/useFilteredUsers';
import { useEffect } from 'react';
import Card from '@widgets/Card';
import Filters from '@widgets/Filters';
import {
  getCitiesData,
  getSkillsData,
  getUsersData,
} from '@store/slices/userDataSlice/userDataSlice';
import Card from '@widgets/Card';
import UsersCardsRecommendations from '@/widgets/UsersCardsRecommendations'; // Импорт карточек с новыми рекомендациями- временно!!
import style from './HomePage.module.css';

export function HomePage() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsersData());
    dispatch(getCitiesData());
    dispatch(getSkillsData());
  }, [dispatch]);
  // выше - иницилизация данных в приложение (обязательно установить в корневой элемент app || main)

  const { activeLearn, activeAuthor, activeSkills, activeCities } = useSelector(
    (state) => state.filters
  ); // это получение данных с активных кнопок фильтрации которые выбрал пользователей, нужны для вызова функции фильтрации

  const filteredUsers = useFilteredUsers({ activeLearn, activeAuthor, activeCities, activeSkills }); // вызов функции фильтрации. data становится массивом отфильтрованных товаров

  // нижне проверка работоспособности (удалить)
  const cities = useSelector((state) => state.users.cities);
  const skills = useSelector((state) => state.users.skills);
  useEffect(() => {
    // console.log(filteredUsers);
    // console.log(cities);
    // console.log(skills);
  }, [filteredUsers, cities, skills]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  function handleViewAllFunction(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className={style.homeSection}>
      {/* Блок с новыми пользовательями- потом переставить на нужное место!!! */}
      <div className={style.recommendationsSection}>
        <UsersCardsRecommendations title="Новое" onViewAll={handleViewAllFunction} />
      </div>
      <div className={style.main}>
        <div className={style.sidebar}>
          <Filters />
        </div>
        <div className={style.cards}>
          {filteredUsers?.map((user) => (
            <Card key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
