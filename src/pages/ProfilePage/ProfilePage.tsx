import SideBar from '@features/SideBar/SideBar';
import ProfileData from '@features/profile/ProfileData';
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
