import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ROUTES } from '@/shared/lib/constants/routes';
import ButtonDefault from '@/shared/ui/ButtonDefault/ButtonDefault';
import { useSelector, type RootState } from '@/store/store';
import styles from './userMenu.module.css';
import Like from '@/shared/assets/images/IconsSvg/Like';
import Notification from '@/shared/assets/images/IconsSvg/Notification';
import ThemeToggle from '../themeToggle';
import Modal from '@/shared/ui/modal/Modal';
import Notifications from '@/shared/ui/Notifications/Notifications';
import UserMenuContent from '@/shared/ui/userMenuContent/UserMenuContent';
import { readNotificationsMock, unreadNotificationsMock } from '@/shared/lib/mocks/notifications';

type OpenModal = 'notifications' | 'profile' | null;

export default function UserMenu() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [openModal, setOpenModal] = useState<OpenModal>(null);

  const unreadCount = unreadNotificationsMock.length;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenModal(null);
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

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

        <div>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="Уведомления"
            onMouseDown={(e) => {
              e.stopPropagation();
              setOpenModal((prev) => (prev === 'notifications' ? null : 'notifications'));
            }}
          >
            <Notification />
            {unreadCount > 0 && <span className={styles.badge} />}
          </button>

          <Modal isOpen={openModal === 'notifications'} onClose={() => setOpenModal(null)}>
            <Notifications
              unreadNotifications={unreadNotificationsMock}
              readNotifications={readNotificationsMock}
            />
          </Modal>
        </div>

        <button type="button" className={styles.iconButton} aria-label="Лайки">
          <Like />
        </button>
      </div>

      <div className={styles.profileWrapper}>
        <button
          type="button"
          className={styles.profile}
          onMouseDown={(e) => {
            e.stopPropagation();
            setOpenModal((prev) => (prev === 'profile' ? null : 'profile'));
          }}
          aria-haspopup="menu"
          aria-expanded={openModal === 'profile'}
        >
          <span>{user?.name}</span>
          <img className={styles.avatar} src={user?.avatar} alt={user?.name} />
        </button>

        <Modal isOpen={openModal === 'profile'} onClose={() => setOpenModal(null)}>
          <UserMenuContent
            onProfileClick={() => {
              navigate('/profile');
              setOpenModal(null);
            }}
            onLogoutClick={() => {
              navigate('/');
              setOpenModal(null);
            }}
          />
        </Modal>
      </div>
    </div>
  );

  return user ? userMenu : guestMenu;
}
