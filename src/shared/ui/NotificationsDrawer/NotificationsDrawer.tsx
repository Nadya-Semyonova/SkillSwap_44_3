import { useRef } from 'react';
import { useClickOutside } from '@shared/lib/hooks/useClickOutside';
import { usePressEsc } from '@shared/lib/hooks/usePressEsc';
import Idea from '@/shared/assets/images/IconsSvg/Idea';
import ButtonDefault from '../ButtonDefault';
import type { NotificationsProps, Notification } from './types';
import style from './NotificationsDrawer.module.css';

export default function NotificationsDrawer({
  isOpen,
  onClose,
  unreadNotifications = [],
  readNotifications = [],
  children,
}: NotificationsProps) {
  const notificationsRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: notificationsRef,
    handler: onClose,
    isEnabled: isOpen,
  });

  usePressEsc({
    handler: onClose,
    isEnabled: isOpen,
  });

  const notificationsClassName = `${style.notifications} ${
    isOpen ? style.notificationsOpen : style.notificationsClosed
  }`;

  if (children) {
    return (
      <div ref={notificationsRef} className={notificationsClassName}>
        {children}
      </div>
    );
  }

  if (!isOpen) {
    return <div ref={notificationsRef} className={notificationsClassName} />;
  }

  // Функция для рендера одного уведомления
  const renderNotification = (notification: Notification, index: number, isRead = false) => (
    <li key={notification.id ?? index} className={style.notificationItem}>
      <div className={style.notificationItemWrap}>
        <div className={style.notificationIcon}>
          <Idea />
        </div>
        <div className={style.notificationContainer}>
          <p>{notification.title}</p>
          <p>{notification.text}</p>
        </div>
        <p>{notification.date}</p>
      </div>
      {!isRead && <ButtonDefault name="Перейти" styleButton={style.notificationButtonGo} />}
    </li>
  );

  return (
    <div ref={notificationsRef} className={notificationsClassName}>
      {/* Блок непрочитанных уведомлений */}
      <div className={style.notificationsWrap}>
        <div className={style.notificationsTitle}>
          <p className={style.notificationsTitleText}>Новые уведомления</p>
          <button
            type="button"
            className={style.notificationsButton}
            aria-label="Прочитать все уведомления"
          >
            Прочитать все
          </button>
        </div>
        {unreadNotifications.length === 0 ? (
          <div className={style.emptyState}>
            <p>Нет уведомлений</p>
          </div>
        ) : (
          <ul className={style.notificationsList}>
            {unreadNotifications.map((notification, index) =>
              renderNotification(notification, index, false)
            )}
          </ul>
        )}
      </div>

      {/* Блок прочитанных уведомлений */}
      <div className={style.notificationsWrap}>
        <div className={style.notificationsTitle}>
          <p className={style.notificationsTitleText}>Просмотренные</p>
          <button
            type="button"
            className={style.notificationsButton}
            aria-label="Очистить уведомления уведомления"
          >
            Очистить
          </button>
        </div>
        {readNotifications.length === 0 ? (
          <div className={style.emptyState}>
            <p>Нет просмотренных уведомлений</p>
          </div>
        ) : (
          <ul className={style.notificationsList}>
            {readNotifications.map((notification, index) =>
              renderNotification(notification, index, true)
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
