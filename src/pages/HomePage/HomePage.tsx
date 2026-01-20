import { useState } from 'react';
import Filters from '@widgets/Filters';
import { NotificationsDrawer } from '@shared/ui/NotificationsDrawer';
import { unreadNotificationsMock, readNotificationsMock } from '@shared/lib/mocks/notifications';
import NotificationIcon from '@public/img/IconsSvg/Notification';
import style from './HomePage.module.css';

export function HomePage() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div>
      <div className={style.header}>
        <h1 className={style.pageTitle}>skillswap</h1>
        <button
          type="button"
          onClick={() => setIsNotificationsOpen(true)}
          className={style.notificationButton}
          aria-label="Открыть уведомления"
        >
          <NotificationIcon />
        </button>
      </div>
      <Filters />
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        unreadNotifications={unreadNotificationsMock}
        readNotifications={readNotificationsMock}
      />
    </div>
  );
}
