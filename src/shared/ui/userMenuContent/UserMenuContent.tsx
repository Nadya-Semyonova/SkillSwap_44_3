import Logout from '@/shared/assets/images/IconsSvg/Logout';
import styles from './userMenuContent.module.css';

type Props = {
  onProfileClick: () => void;
  onLogoutClick: () => void;
};

export default function UserMenuContent({ onProfileClick, onLogoutClick }: Props) {
  return (
    <div className={styles.dropdown}>
      <button type="button" className={styles.dropdownItem} onClick={onProfileClick}>
        Личный кабинет
      </button>

      <button type="button" className={styles.dropdownItem} onClick={onLogoutClick}>
        Выйти из аккаунта
        <Logout />
      </button>
    </div>
  );
}
