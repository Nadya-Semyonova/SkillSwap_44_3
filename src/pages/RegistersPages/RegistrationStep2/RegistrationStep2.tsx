import ButtonDefault from '@shared/ui/ButtonDefault';
import UserCircle from '@/shared/assets/images/IconsSvg/UserCircle';
import Add from '@/shared/assets/images/IconsSvg/Add';
import UserInfo from '@/shared/assets/images/IllustrationsSvg/UserInfo';
import { UserSelector } from '@/features/auth/UserCalendar/UserSelector';
import { Input } from '@shared/ui/useInput';
import { ToggledSelect } from '@/shared/ui/ToggleSelector';
import { useState } from 'react';
import style from './RegistrationStep2.module.css';

export function RegistrationStep2() {
  const [name, setName] = useState<string>('');

  return (
    <div className={style.container}>
      <div className={style.leftColumn}>
        <form className={style.form}>
          <div className={style.avatarContainer}>
            <button
              type="button"
              className={style.avatarIcon}
              onClick={() => {}}
              aria-label="Аватар пользователя"
            >
              <UserCircle />
            </button>
            <button
              type="button"
              className={style.avatarPlus}
              onClick={() => {}}
              aria-label="Добавить аватар"
            >
              <Add />
            </button>
          </div>

          <div className={style.fieldGroup}>
            <Input 
              title="Имя" 
              placeholder="Введите ваше имя" 
              onChange={(value: string) => setName(value)}
            />
          </div>

          <div className={style.rowFields}>
            <div className={style.fieldGroup}>
              <label className={style.label} htmlFor="dateOfBirth">
                Дата рождения
              </label>
              <div className={style.datePickerWrapper}>
                <UserSelector />
              </div>
            </div>

            <div className={style.fieldGroup}>
              <ToggledSelect title="Пол" placeholder="Не указан">
                <div onClick={() => {}}>Не указан</div>
                <div onClick={() => {}}>Мужской</div>
                <div onClick={() => {}}>Женский</div>
              </ToggledSelect>
            </div>
          </div>

          <div className={style.fieldGroup}>
            <ToggledSelect title="Город" placeholder="Не указан">
              <div onClick={() => {}}>Не указан</div>
            </ToggledSelect>
          </div>

          <div className={style.fieldGroup}>
            <ToggledSelect title="Категория навыка, которому хотите научиться" placeholder="Выберите категорию">
              <div onClick={() => {}}>Выберите категорию</div>
            </ToggledSelect>
          </div>

          <div className={style.fieldGroup}>
            <ToggledSelect title="Подкатегория навыка, которому хотите научиться" placeholder="Выберите подкатегорию">
              <div onClick={() => {}}>Выберите подкатегорию</div>
            </ToggledSelect>
          </div>

          <div className={style.buttonsRow}>
            <ButtonDefault
              name="Назад"
              handleClick={() => {}}
              variant="outline"
              styleButton={style.buttonBack}
            />
            <ButtonDefault
              name="Продолжить"
              handleClick={() => {}}
              variant="continue"
              styleButton={style.buttonContinue}
            />
          </div>
        </form>
      </div>
      <div className={style.rightColumn}>
        <div className={style.illustration}>
          <UserInfo />
        </div>
        <h2 className={style.infoTitle}>Расскажите немного о себе</h2>
        <p className={style.infoText}>
          Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена
        </p>
      </div>
    </div>
  );
}