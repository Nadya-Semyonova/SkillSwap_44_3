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
import {
  registerUser,
  setAbout,
  setAvatar,
  setCategory,
  setCity,
  setDateOfBirth,
  setDescription,
  setEmail,
  setGender,
  setName,
  setPassword,
  setPhotos,
  setSkill,
  setSkillOff,
  setSubcategory,
} from '@/store/slices/registerUserSlice.ts/registerUserSlice';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setAvatar('https://api.dicebear.com/9.x/avataaars/svg?seed=Jameson&backgroundColor=b6e3f4')
    );
    dispatch(setName('Александр'));
    dispatch(setCity('Москва'));
    dispatch(setDateOfBirth('22-03-1995'));
    dispatch(setGender('male'));
    dispatch(setEmail('alexander95@email.com'));
    dispatch(setPassword('aB3kL9mNpQ7rS2tU'));
    dispatch(setAbout('Привет! Увлекаюсь проектным управлением и всегда рад поделиться опытом.'));
    dispatch(setSkill('Проектное управление'));
    dispatch(setCategory('Бизнес и карьера'));
    dispatch(setSubcategory('Проектное управление'));
    dispatch(
      setDescription('Работаю в IT-проектах уже 6 лет и прошёл путь от аналитика до руководителя.')
    );
    dispatch(
      setPhotos([
        'https://c.pxhere.com/photos/46/93/white_board_startup_start_up_presentation_board_diagram_present_show-764635.jpg!d',
        'https://c.pxhere.com/photos/e5/16/code_data_programming_code_computer_programming_information_technology_technology_security_development-693080.jpg!d',
        'https://c.pxhere.com/photos/53/20/digital_marketing_emarketing_the_positioning_of_the_seo_sem_serp_google_business-450236.jpg!d',
      ])
    );
    dispatch(setSkillOff(['Проектное управление', 'Личный бренд']));

    dispatch(registerUser());
    dispatch(getUsersData());
    dispatch(getCitiesData());
    dispatch(getSkillsData());
    dispatch(loadUserFromStorage());
  }, [dispatch]); // Инициализация приложения

  return (
    <div className={styles.app}>
      <AppRoute />
    </div>
  );
}
