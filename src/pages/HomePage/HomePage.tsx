import { useDispatch, useSelector } from '@store/store';
import { useFilteredUsers } from '@widgets/Filters/hooks/useFilteredUsers';
import { useEffect } from 'react';
import Filters from '@/widgets/Filters';
import {
  getCitiesData,
  getSkillsData,
  getUsersData,
} from '@/store/slices/userDataSlice/userDataSlice';
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filteredUsers = useFilteredUsers({ activeLearn, activeAuthor, activeCities, activeSkills }); // вызов функции фильтрации. data становится массивом отфильтрованных товаров

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={style.homeSection}>
      <h1 className={style.pageTitle}>skillswap</h1>
      <Filters />
    </div>
  );
}
