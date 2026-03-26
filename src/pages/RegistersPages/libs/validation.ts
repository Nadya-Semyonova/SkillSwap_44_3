// Валидация для Step 1 (email и пароль)
export const validateStep1 = (email: string, password: string) => {
  const errors: { email?: string; password?: string } = {};

  if (!email) {
    errors.email = 'Email обязателен';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Введите корректный email';
  }

  if (!password) {
    errors.password = 'Пароль обязателен';
  } else if (password.length < 8) {
    errors.password = 'Пароль должен содержать не менее 8 символов';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

// Валидация для Step 2
export const validateStep2 = (
  name: string,
  dateOfBirth: string,
  gender: string,
  city: string,
  category: string,
  subcategory: string
) => {
  const errors: {
    name?: string;
    dateOfBirth?: string;
    gender?: string;
    city?: string;
    category?: string;
    subcategory?: string;
  } = {};

  if (!name.trim()) errors.name = 'Имя обязательно';
  if (!dateOfBirth) errors.dateOfBirth = 'Дата рождения обязательна';
  if (!gender) errors.gender = 'Выберите пол';
  if (!city) errors.city = 'Выберите город';
  if (!category) errors.category = 'Выберите категорию';
  if (!subcategory) errors.subcategory = 'Выберите подкатегорию';

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

// Валидация для Step 3
export const validateStep3 = (
  skillName: string,
  category: string,
  subcategory: string,
  description: string
) => {
  const errors: {
    skillName?: string;
    category?: string;
    subcategory?: string;
    description?: string;
  } = {};

  if (!skillName.trim()) errors.skillName = 'Название навыка обязательно';
  if (!category) errors.category = 'Выберите категорию';
  if (!subcategory) errors.subcategory = 'Выберите подкатегорию';
  if (!description.trim()) errors.description = 'Описание обязательно';

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
