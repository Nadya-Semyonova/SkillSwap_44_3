import type { CardUser } from './types';

export const MOCK_USER: CardUser = {
  id: 1,
  liked: 4,
  avatar: 'https://c.pxhere.com/images/e0/1b/88e3502e1a2102491a45cd3564d5-1447187.jpg!d',
  name: 'Александр',
  city: 'Москва',
  age: 29,
  about: 'Привет! Увлекаюсь проектным управлением...',
  card_people: {
    skill: 'Проектное управление',
    category: 'Бизнес и карьера',
    subcategory: 'Проектное управление',
    description: 'Работаю в IT-проектах уже 6 лет...',
    photos: ['https://...'],
  },
  skill_off: ['Тайм-менеджмент', 'Медитация', 'Личный бренд'],
};
