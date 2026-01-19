import Filters from '@widgets/Filters';
import { useDispatch, useSelector } from '@store/store';
import { useFilteredUsers } from '@widgets/Filters/hooks/useFilteredUsers';
import { useEffect } from 'react';
import { getUsersData } from '@store/slices/userDataSlice/userDataSlice';
import style from './HomePage.module.css';

export function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersData());
  }, [dispatch]);

  const { activeLearn, activeAuthor, activeSkills, activeCities } = useSelector(
    (state) => state.filters
  );
  const data = useFilteredUsers({ activeLearn, activeAuthor, activeCities, activeSkills });
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      <h1 className={style.pageTitle}>skillswap</h1>
      <Filters />
    </div>
  );
}
