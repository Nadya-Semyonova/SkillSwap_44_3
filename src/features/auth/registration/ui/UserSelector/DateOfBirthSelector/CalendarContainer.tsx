import ButtonDefault from '@shared/ui/ButtonDefault';
import styles from './DateOfBirthSelector.module.css';
import type { TCalendarContainer } from './types';

export function CalendarContainer({
  children,
  onConfirm,
  onCancel,
  className,
}: TCalendarContainer) {
  return (
    <div className={className} role="dialog" aria-label="Выбор даты">
      {children}

      <div className={styles.calendarFooter}>
        <ButtonDefault name="Отменить" handleClick={onCancel} styleButton={styles.cancel} />

        <ButtonDefault name="Выбрать" handleClick={onConfirm} styleButton={styles.confirm} />
      </div>
    </div>
  );
}
