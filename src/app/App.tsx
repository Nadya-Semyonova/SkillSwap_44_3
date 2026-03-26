import { useDispatch } from '@store/store';
import { useEffect } from 'react';
import {
  getCitiesData,
  getSkillsData,
  getUsersData,
} from '@store/slices/userDataSlice/userDataSlice';
import { loadUserFromStorage } from '@store/slices/authSlice/authSlice';
import styles from './App.module.css';
import AppRoute from './AppRoute';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersData());
    dispatch(getCitiesData());
    dispatch(getSkillsData());
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppRoute />
    </div>
  );
}
