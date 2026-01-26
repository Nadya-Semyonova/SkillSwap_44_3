import type { IUser } from '@/types/types';

/**
 * Мок авторизованного пользователя для Storybook историй
 */
export const authorizedUserMock: IUser = {
  id: 1,
  liked: 5,
  avatar: 'https://avatars.dicebear.com/api/avataaars/felix.svg',
  name: 'Иван Петров',
  city: 'Москва',
  age: 28,
  dateOfBirth: '1996-05-15',
  gender: 'male',
  email: 'ivan@example.com',
  password: 'hashedPassword123',
  createdAt: '2024-01-15T10:30:00Z',
  about: 'Увлекаюсь веб-разработкой и учу английский язык',
  card_people: {
    skill: 'Разработка на React',
    category: 'Программирование',
    subcategory: 'Frontend',
    description: 'Помогу разобраться в React и создать красивый интерфейс',
    photos: [
      'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400',
      'https://images.unsplash.com/photo-1517694712202-14819c9cb6b1?w=400',
    ],
  },
  skill_off: ['Python', 'DevOps'],
};

/**
 * Мок неавторизованного пользователя (гость)
 */
export const guestUserMock: IUser | null = null;

/**
 * Мок уведомлений
 */
export const notificationsMock = {
  unread: [
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
  ],
  read: [
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
  ],
};

/**
 * Различные варианты пользователей для демонстрации
 */
export const userVariants = {
  authorized: authorizedUserMock,
  guest: guestUserMock,
  anotherUser: {
    ...authorizedUserMock,
    id: 2,
    name: 'Мария Сидорова',
    avatar: 'https://avatars.dicebear.com/api/avataaars/julia.svg',
    city: 'Санкт-Петербург',
    email: 'maria@example.com',
    liked: 12,
  } as IUser,
};

/**
 * Пусто уведомления для истории WithoutNotifications
 */
export const emptyNotificationsMock = {
  unread: [],
  read: [],
};
