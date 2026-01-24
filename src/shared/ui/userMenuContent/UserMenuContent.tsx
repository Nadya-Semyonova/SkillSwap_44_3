import Logout from '@/shared/assets/images/IconsSvg/Logout';
import styles from './userMenuContent.module.css';
import { useDispatch } from '@/store/store';
import { logout } from '@/store/slices/authSlice/authSlice';

type Props = {
  onProfileClick: () => void;
  onLogoutClick: () => void;
};

export default function UserMenuContent({ onProfileClick, onLogoutClick }: Props) {
  const dispatch = useDispatch();

  return (
    <div className={styles.dropdown}>
      <button type="button" className={styles.dropdownItem} onClick={onProfileClick}>
        Личный кабинет
      </button>

      <button
        type="button"
        className={styles.dropdownItem}
        onClick={() => {
          dispatch(logout());
          onLogoutClick();
        }}
      >
        Выйти из аккаунта
        <Logout />
      </button>
    </div>
  );
}
