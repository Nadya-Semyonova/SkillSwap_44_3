import DateOfBirthSelector from './DateOfBirthSelector/DateOfBirthSelector';

interface IUserSelector {
  bithDay?: string | null;
  setBithDay: (value: string) => void;
}

export function UserSelector({ bithDay = '', setBithDay }: IUserSelector) {
  // Преобразуем строку в Date для DatePicker
  const birthDate = bithDay
    ? (() => {
        try {
          // Обрабатываем оба формата: дд-мм-гггг и дд.мм.гггг
          const dateString = bithDay.replace(/-/g, '.');
          const [day, month, year] = dateString.split('.').map(Number);

          // Используем Number.isNaN вместо isNaN
          if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
            return null;
          }
          return new Date(year, month - 1, day);
        } catch {
          return null;
        }
      })()
    : null;

  // Функция для обработки изменения даты
  const handleDateChange = (date: Date | null) => {
    if (date && !Number.isNaN(date.getTime())) {
      // Проверка на валидность даты
      // Форматируем дату в формат "дд-мм-гггг"
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

      setBithDay(formattedDate);
    } else {
      // Если дата очищена
      setBithDay('');
    }
  };

  return (
    <DateOfBirthSelector value={birthDate} onChange={handleDateChange} placeholder="дд.мм.гггг" />
  );
}
