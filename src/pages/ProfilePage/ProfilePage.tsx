import SideBar from '@/features/profile/SideBar/SideBar';
import ProfileData from '@/features/profile/ProfileData';
import styles from '@/pages/ProfilePage/ProfilePage.module.css';

function ProfilePage() {
  return (
    <section className={styles.profile}>
      <SideBar />
      <ProfileData />
    </section>
  );
}

export default ProfilePage;
