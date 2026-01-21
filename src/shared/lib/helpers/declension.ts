/* Функция для правильного склонения слова "год" в зависимости от числа */
export const declensionAge = (age: number): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = ['год', 'года', 'лет'];

  return `${age} ${titles[age % 100 > 4 && age % 100 < 20 ? 2 : cases[Math.min(age % 10, 5)]]}`;
};

/* Универсальная функция для склонения слов по числам */
export const pluralize = (number: number, titles: [string, string, string]): string => {
  const cases = [2, 0, 1, 1, 1, 2];

  return `${number} ${
    titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]]
  }`;
};

// Альтернативная реализация для лучшей читаемости:
export const getAgeWithDeclension = (age: number): string => {
  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;

  // Исключения для чисел 11-14
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${age} лет`;
  }

  // Для чисел, оканчивающихся на 1
  if (lastDigit === 1) {
    return `${age} год`;
  }

  // Для чисел, оканчивающихся на 2, 3, 4
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${age} года`;
  }

  // Для остальных случаев (0, 5-9, 15-20 и т.д.)
  return `${age} лет`;
};
