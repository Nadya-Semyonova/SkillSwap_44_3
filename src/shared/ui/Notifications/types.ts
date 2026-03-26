import { type ReactNode } from 'react';

export interface Notification {
  id?: string | number;
  title: string;
  text: string;
  date?: string;
}

export interface NotificationsProps {
  isOpen: boolean;
  onClose: () => void;
  unreadNotifications?: Notification[];
  readNotifications?: Notification[];
  children?: ReactNode;
}
