import { useState } from 'react';
import SideBar from '@/features/profile/SideBar/SideBar';
import ProfileData from '@/features/profile/ProfileData';
import styles from '@/pages/ProfilePage/ProfilePage.module.css';
import { FavouritesContent } from '@/features/profile/favourites/FavouritesContent';

function ProfilePage() {
  const [activeButton, setActiveButton] = useState<string>('personal');

  const renderContent = () => {
    switch (activeButton) {
      case 'personal':
        return <ProfileData />;
      case 'requests':
        return <div className={styles.placeholder}>Контент для Заявок (заглушка)</div>;
      case 'exchanges':
        return <div className={styles.placeholder}>Контент для Моих обменов (заглушка)</div>;
      case 'favorites':
        return <FavouritesContent />;
      case 'skills':
        return <div className={styles.placeholder}>Контент для Моих навыков (заглушка)</div>;
      default:
        return <ProfileData />;
    }
  };

  return (
    <section className={styles.profile}>
      <SideBar activeButton={activeButton} onButtonClick={setActiveButton} />
      {renderContent()}
    </section>
  );
}

export default ProfilePage;
