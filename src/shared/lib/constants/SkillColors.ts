/* Константа для маппинга категорий навыков к цветам для Card */

export const SKILL_CATEGORY_COLORS = {
  // Бизнес и карьера
  'Бизнес и карьера': 'var(--color-tag-business)',
  'Управление командой': 'var(--color-tag-business)',
  'Маркетинг и реклама': 'var(--color-tag-business)',
  'Продажи и переговоры': 'var(--color-tag-business)',
  'Личный бренд': 'var(--color-tag-business)',
  'Резюме и собеседование': 'var(--color-tag-business)',
  'Тайм-менеджмент': 'var(--color-tag-business)',
  'Проектное управление': 'var(--color-tag-business)',
  Предпринимательство: 'var(--color-tag-business)',

  // Творчество и искусство
  'Творчество и искусство': 'var(--color-tag-art)',
  'Рисование и иллюстрация': 'var(--color-tag-art)',
  Фотография: 'var(--color-tag-art)',
  Видеомонтаж: 'var(--color-tag-art)',
  'Музыка и звук': 'var(--color-tag-art)',
  'Актёрское мастерство': 'var(--color-tag-art)',
  'Креативное письмо': 'var(--color-tag-art)',
  'Арт-терапия': 'var(--color-tag-art)',
  'Декор и DIY': 'var(--color-tag-art)',

  // Иностранные языки
  'Иностранные языки': 'var(--color-tag-languages)',
  Английский: 'var(--color-tag-languages)',
  Французский: 'var(--color-tag-languages)',
  Испанский: 'var(--color-tag-languages)',
  Немецкий: 'var(--color-tag-languages)',
  Китайский: 'var(--color-tag-languages)',
  Японский: 'var(--color-tag-languages)',
  'Подготовка к экзаменам (IELTS, TOEFL)': 'var(--color-tag-languages)',

  // Образование и развитие
  'Образование и развитие': 'var(--color-tag-education)',
  'Личностное развитие': 'var(--color-tag-education)',
  'Навыки обучения': 'var(--color-tag-education)',
  'Когнитивные техники': 'var(--color-tag-education)',
  Скорочтение: 'var(--color-tag-education)',
  'Навыки преподавания': 'var(--color-tag-education)',
  Коучинг: 'var(--color-tag-education)',

  // Дом и уют
  'Дом и уют': 'var(--color-tag-home)',
  'Уборка и организация': 'var(--color-tag-home)',
  'Домашние финансы': 'var(--color-tag-home)',
  'Приготовление еды': 'var(--color-tag-home)',
  'Домашние растения': 'var(--color-tag-home)',
  Ремонт: 'var(--color-tag-home)',
  'Хранение вещей': 'var(--color-tag-home)',

  // Здоровье и лайфстайл
  'Здоровье и лайфстайл': 'var(--color-tag-health)',
  'Йога и медитация': 'var(--color-tag-health)',
  'Питание и ЗОЖ': 'var(--color-tag-health)',
  'Ментальное здоровье': 'var(--color-tag-health)',
  Осознанность: 'var(--color-tag-health)',
  'Физические тренировки': 'var(--color-tag-health)',
  'Сон и восстановление': 'var(--color-tag-health)',
  'Баланс жизни и работы': 'var(--color-tag-health)',

  // Дополнительный цвет для "+N" и других случаев
  Дополнительно: 'var(--color-tag-more)',
} as const;

/* Используется для типизации в компонентах */
export type SkillCategory = keyof typeof SKILL_CATEGORY_COLORS;

/* Вспомогательная функция для получения цвета по категории */
export const getSkillColor = (category: string): string => {
  return SKILL_CATEGORY_COLORS[category as SkillCategory] || 'var(--color-tag-more)';
};

/* Константа для определения родительских категорий */
export const MAIN_CATEGORIES = [
  'Бизнес и карьера',
  'Творчество и искусство',
  'Иностранные языки',
  'Образование и развитие',
  'Дом и уют',
  'Здоровье и лайфстайл',
] as const;
