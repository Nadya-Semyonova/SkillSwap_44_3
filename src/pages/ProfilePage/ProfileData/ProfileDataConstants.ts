export const profileText = {
  email: 'Почта',
  name: 'Имя',
  about: 'О себе',
  changePassword: 'Изменить пароль',
  userAvatarAlt: 'Аватар пользователя',
  save: 'Сохранить',
  genderTitle: 'Пол',
  genderPlaceholder: 'Выберите пол',
  cityTitle: 'Город',
  cityPlaceholder: 'Выберите город',
} as const;

export const genderOptions = [
  { value: 'female', label: 'Женский' },
  { value: 'male', label: 'Мужской' },
] as const;
