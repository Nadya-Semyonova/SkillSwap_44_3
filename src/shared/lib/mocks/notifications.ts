import type { Notification } from '@shared/ui/NotificationsDrawer';

export const unreadNotificationsMock: Notification[] = [
  {
    id: 1,
    title: 'Николай принял ваш обмен',
    text: 'Перейдите в профиль, чтобы обсудить детали',
    date: 'сегодня',
  },
  {
    id: 2,
    title: 'Татьяна предлагает вам обмен',
    text: 'Примите обмен, чтобы обсудить детали',
    date: 'сегодня',
  },
];

export const readNotificationsMock: Notification[] = [
  {
    id: 3,
    title: 'Олег предлагает вам обмен',
    text: 'Примите обмен, чтобы обсудить детали',
    date: 'вчера',
  },
  {
    id: 4,
    title: 'Игорь принял ваш обмен',
    text: 'Перейдите в профиль, чтобы обсудить детали',
    date: '23 мая',
  },
];
