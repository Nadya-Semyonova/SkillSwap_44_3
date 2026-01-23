import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import { parse, isValid } from 'date-fns';
import type { TDateOfBirthSelectorProps } from './types';
import { DateInput } from './DateInput';
import { CalendarContainer } from './CalendarContainer';
import 'react-datepicker/dist/react-datepicker.css';
import './DateOfBirthDatepicker.css';
import styles from './DateOfBirthSelector.module.css';

registerLocale('ru', ru);

const MIN_DATE = new Date(1970, 0, 1);
const MAX_DATE = new Date(2026, 11, 31);
const DATE_FORMAT = 'dd.MM.yyyy';
const WEEK_DAY_MAP: Record<string, string> = {
  понедельник: 'Пн',
  вторник: 'Вт',
  среда: 'Ср',
  четверг: 'Чт',
  пятница: 'Пт',
  суббота: 'Сб',
  воскресенье: 'Вс',
};

function clampToRange(date: Date) {
  if (date < MIN_DATE) return MIN_DATE;
  if (date > MAX_DATE) return MAX_DATE;
  return date;
}

function formatInput(inputValue: string) {
  const digits = inputValue.replace(/\D/g, '').slice(0, 8);

  let day = digits.slice(0, 2);
  let month = digits.slice(2, 4);
  let year = digits.slice(4, 8);

  if (month.length === 2) {
    const m = Math.max(1, Math.min(12, Number(month)));
    month = String(m).padStart(2, '0');
  }

  if (year.length === 4) {
    const y = Math.max(1970, Math.min(2026, Number(year)));
    year = String(y);
  }

  if (day.length === 2 && month.length === 2) {
    const y = year.length === 4 ? Number(year) : new Date().getFullYear();
    const m = Number(month);
    const maxDay = new Date(y, m, 0).getDate();
    const d = Math.max(1, Math.min(maxDay, Number(day)));
    day = String(d).padStart(2, '0');
  }

  let formatted = day;
  if (month) formatted += `.${month}`;
  if (year) formatted += `.${year}`;

  return formatted;
}

function DateOfBirthSelector(props: TDateOfBirthSelectorProps) {
  const { value, onChange, placeholder, id } = props;

  const [draftDate, setDraftDate] = useState<Date | null>(value);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (date: Date | null) => setDraftDate(date);

  const handleChangeRaw = (
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    selectionMeta?: unknown
  ) => {
    if (!event) return;

    if (selectionMeta === undefined) {
      // параметр нужен для сигнатуры react-datepicker
    }

    const target = event.currentTarget;
    if (!(target instanceof HTMLInputElement)) return;

    const formatted = formatInput(target.value);
    target.value = formatted;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Enter') return;

    event.preventDefault();

    const input = event.currentTarget as HTMLInputElement;
    const formatted = formatInput(input.value);
    input.value = formatted;

    const parsedDate = parse(formatted, DATE_FORMAT, new Date());

    if (isValid(parsedDate)) {
      const clamped = clampToRange(parsedDate);
      setDraftDate(clamped);
      onChange?.(clamped);
      setIsOpen(false);
    }
  };

  const handleOpen = () => {
    if (!draftDate && value) {
      setDraftDate(value);
    }
    setIsOpen(true);
  };

  const handleConfirm = () => {
    onChange?.(draftDate ?? null);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setDraftDate(null);
    onChange?.(null);
    setIsOpen(false);
  };

  const handleClose = () => setIsOpen(false);

  function renderCalendarContainer(
    children: React.ReactNode,
    className: string | undefined,
    onCancel: () => void,
    onConfirm: () => void
  ) {
    return (
      <CalendarContainer className={className} onCancel={onCancel} onConfirm={onConfirm}>
        {children}
      </CalendarContainer>
    );
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Дата рождения</span>

      <div>
        <DatePicker
          selected={draftDate ?? value ?? null}
          minDate={MIN_DATE}
          maxDate={MAX_DATE}
          dateFormat={DATE_FORMAT}
          placeholderText={placeholder}
          open={isOpen}
          onChange={handleChange}
          onChangeRaw={handleChangeRaw}
          onFocus={handleOpen}
          onClickOutside={handleClose}
          onKeyDown={handleKeyDown}
          shouldCloseOnSelect={false}
          locale="ru"
          id={id}
          showMonthDropdown
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={70}
          fixedHeight
          popperPlacement="bottom-start"
          formatWeekDay={(name) => WEEK_DAY_MAP[name.toLowerCase()] ?? name.slice(0, 2)}
          customInput={<DateInput />}
          calendarContainer={({ className, children }) =>
            renderCalendarContainer(children, className, handleCancel, handleConfirm)
          }
        />
      </div>
    </div>
  );
}

export default DateOfBirthSelector;
