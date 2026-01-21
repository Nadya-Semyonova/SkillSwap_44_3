import styles from './ProfilePage.module.css';
import SideBar from '@/features/SideBar/SideBar';
import ProfileData from '@/features/profile/ProfileData';

function ProfilePage() {
  return (
    <section className={styles.profile}>
      <SideBar />
      <ProfileData />
    </section>
  );
}

export default ProfilePage;
