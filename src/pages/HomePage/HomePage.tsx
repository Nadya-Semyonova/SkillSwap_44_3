import { useEffect } from 'react';
import { useDispatch, useSelector } from '@store/store';
import { getUsersData } from '@store/slices/userDataSlice/userDataSlice';
import Filters from '@widgets/Filters';
import Card from '@widgets/Card';
import style from './HomePage.module.css';

export function HomePage() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsersData());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={style.homeSection}>
      <h1 className={style.pageTitle}>skillswap</h1>
      <div className={style.main}>
        <div className={style.sidebar}>
          <Filters />
        </div>
        <div className={style.cards}>
          {users?.map((user) => (
            <Card key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
