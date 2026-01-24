import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ROUTES } from '@/shared/lib/constants/routes';
import ButtonDefault from '@/shared/ui/ButtonDefault/ButtonDefault';
import { useSelector, type RootState } from '@/store/store';
import styles from './userMenu.module.css';
import Like from '@/shared/assets/images/IconsSvg/Like';
import Notification from '@/shared/assets/images/IconsSvg/Notification';
import ThemeToggle from '../themeToggle';
import Logout from '@/shared/assets/images/IconsSvg/Logout';
import Modal from '@/shared/ui/modal/Modal';

export default function UserMenu() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);

  const guestMenu = (
    <div className={styles.guest}>
      <ThemeToggle />
      <nav className={styles.buttons}>
        <NavLink to={ROUTES.LOGIN} className={styles.navLink}>
          <ButtonDefault name="Войти" styleButton={styles.loginButton} />
        </NavLink>

        <NavLink to={ROUTES.REGISTER} className={styles.navLink}>
          <ButtonDefault name="Зарегистрироваться" styleButton={styles.registerButton} />
        </NavLink>
      </nav>
    </div>
  );

  const userMenu = (
    <div className={styles.user}>
      <div className={styles.actions}>
        <ThemeToggle />
        <button type="button" className={styles.iconButton} aria-label="Уведомления">
          <Notification />
        </button>
        <button type="button" className={styles.iconButton} aria-label="Лайки">
          <Like />
        </button>
      </div>

      <div className={styles.profileWrapper}>
        <button
          type="button"
          className={styles.profile}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="menu"
          aria-expanded={isOpen}
        >
          <span>{user?.name}</span>
          <img className={styles.avatar} src={user?.avatar} alt={user?.name} />
        </button>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(true)}>
          <div className={styles.dropdown}>
            <button
              type="button"
              className={styles.dropdownItem}
              onClick={() => {
                navigate('/profile');
                setIsOpen(false);
              }}
            >
              Личный кабинет
            </button>

            <button
              type="button"
              className={styles.dropdownItem}
              onClick={() => {
                navigate('/');
                setIsOpen(false);
              }}
            >
              Выйти из аккаунта
              <Logout />
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );

  return user ? userMenu : guestMenu;
}
