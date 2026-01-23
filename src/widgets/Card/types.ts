import type { IUser } from '@/types/types';

// Тип для навыка "card_people" (может научить)
export interface TeachSkill {
  skill: string; // "Проектное управление"
  category: string; // "Бизнес и карьера"
  subcategory: string; // "Проектное управление"
  description: string; // Подробное описание
  photos?: string[]; // Массив URL фотографий
}

// Тип для тега "skill_off" (хочет научиться)
export type SkillOff = string;

// Основные пропсы для Card компонента
export interface CardProps {
  user: IUser; // Данные пользователя для карточки
  onLikeClick?: () => void; // Колбэк для лайка
  onDetailsClick?: () => void; // Колбэк для кнопки "Подробнее"
  showFullName?: boolean; // Показывать ли возраст
  className?: string;
  variant?: 'default' | 'profile'; // Дополнительные CSS классы
}

// Тип для данных из users.json
export interface UserData extends Omit<IUser, 'id'> {
  id: number;
}

// Тип для тега с цветом
export interface TagSwithColor {
  name: string;
  color: string; // CSS переменная
  isMoreTag?: boolean; // Флаг для тега "+N"
}

// Тип для мока данных (для Storybook и демо)
export interface MockUserData extends Omit<IUser, 'password' | 'email'> {
  // Без чувствительных данных
}

// Константы для отображения
export const CARD_CONSTANTS = {
  MAX_VISIBLE_SKILLS: 2, // Максимум тегов до показа "+N"
  DEFAULT_AVATAR: 'https://c.pxhere.com/images/e0/1b/88e3502e1a2102491a45cd3564d5-1447187.jpg!d',
} as const;
