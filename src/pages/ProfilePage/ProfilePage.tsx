import styles from './ProfilePage.module.css';
import SideBar from './SideBar/SideBar';
import ProfileData from './ProfileData/ProfileData';

function ProfilePage() {
  return (
    <section className={styles.profile}>
      <SideBar />
      <ProfileData />
    </section>
  );
}

export default ProfilePage;
