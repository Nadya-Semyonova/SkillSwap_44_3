import Idea from '@/shared/assets/images/IconsSvg/Idea';
import ButtonDefault from '../ButtonDefault';
import type { Notification } from './types';
import styles from './Notifications.module.css';

type NotificationsProps = {
  unreadNotifications: Notification[];
  readNotifications: Notification[];
};

export default function Notifications({
  unreadNotifications,
  readNotifications,
}: NotificationsProps) {
  const renderNotification = (notification: Notification, isRead = false) => (
    <li key={notification.id} className={styles.notificationItem}>
      <div className={styles.notificationItemWrap}>
        <div className={styles.notificationIcon}>
          <Idea />
        </div>
        <div className={styles.notificationContainer}>
          <p>{notification.title}</p>
          <p>{notification.text}</p>
        </div>
        <p>{notification.date}</p>
      </div>

      {!isRead && <ButtonDefault name="Перейти" styleButton={styles.notificationButtonGo} />}
    </li>
  );

  return (
    <div className={styles.notifications}>
      <div className={styles.notificationsWrap}>
        <div className={styles.notificationsTitle}>
          <h2 className={styles.notificationsTitleText}>Новые уведомления</h2>
          <button
            type="button"
            className={styles.notificationsButton}
            aria-label="Прочитать все уведомления"
          >
            Прочитать все
          </button>
        </div>

        {unreadNotifications.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Нет уведомлений</p>
          </div>
        ) : (
          <ul className={styles.notificationsList}>
            {unreadNotifications.map((n) => renderNotification(n, false))}
          </ul>
        )}
      </div>

      <div className={styles.notificationsWrap}>
        <div className={styles.notificationsTitle}>
          <p className={styles.notificationsTitleText}>Просмотренные</p>
          <button
            type="button"
            className={styles.notificationsButton}
            aria-label="Очистить уведомления"
          >
            Очистить
          </button>
        </div>

        {readNotifications.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Нет просмотренных уведомлений</p>
          </div>
        ) : (
          <ul className={styles.notificationsList}>
            {readNotifications.map((n) => renderNotification(n, true))}
          </ul>
        )}
      </div>
    </div>
  );
}
