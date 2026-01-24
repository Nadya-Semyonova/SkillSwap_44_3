import ProfileData from '@features/profile/ProfileData';
import SideBar from '@/features/profile/SideBar/SideBar';
import styles from './ProfilePage.module.css';

function ProfilePage() {
  return (
    <section className={styles.profile}>
      <SideBar />
      <ProfileData />
    </section>
  );
}

export default ProfilePage;
