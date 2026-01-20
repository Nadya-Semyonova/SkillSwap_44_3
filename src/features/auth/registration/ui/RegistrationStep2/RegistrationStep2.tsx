import style from './RegistrationStep2.module.css';
import UserCircle from '@public/img/IconsSvg/UserCircle';
import PlusCircle from '@public/img/IconsSvg/PlusCircle';
import Calendar from '@public/img/IconsSvg/Calendar';
import ChevronDown from '@public/img/IconsSvg/ChevronDown';

export function RegistrationStep2() {
  return (
    <div className={style.container}>
      <div className={style.leftColumn}>
        <form className={style.form}>
          <div className={style.avatarContainer}>
            <div className={style.avatarIcon}>
              <UserCircle />
            </div>
            <div className={style.avatarPlus}>
              <PlusCircle />
            </div>
          </div>

          <div className={style.fieldGroup}>
            <label className={style.label} htmlFor="name">
              Имя
            </label>
            <input
              type="text"
              id="name"
              className={style.input}
              placeholder="Введите ваше имя"
            />
          </div>

          <div className={style.rowFields}>
            <div className={style.fieldGroup}>
              <label className={style.label} htmlFor="dateOfBirth">
                Дата рождения
              </label>
              <div className={style.inputWithIcon}>
                <input
                  type="text"
                  id="dateOfBirth"
                  className={style.input}
                  placeholder="дд.мм.гггг"
                />
                <div className={style.inputIcon}>
                  <Calendar />
                </div>
              </div>
            </div>

            <div className={style.fieldGroup}>
              <label className={style.label} htmlFor="gender">
                Пол
              </label>
              <div className={style.selectWrapper}>
                <select id="gender" className={style.select}>
                  <option value="">Не указан</option>
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                </select>
                <div className={style.selectIcon}>
                  <ChevronDown />
                </div>
              </div>
            </div>
          </div>

          <div className={style.fieldGroup}>
            <label className={style.label} htmlFor="city">
              Город
            </label>
            <div className={style.selectWrapper}>
              <select id="city" className={style.select}>
                <option value="">Не указан</option>
              </select>
              <div className={style.selectIcon}>
                <ChevronDown />
              </div>
            </div>
          </div>

          <div className={style.fieldGroup}>
            <label className={style.label} htmlFor="skillCategory">
              Категория навыка, которому хотите научиться
            </label>
            <div className={style.selectWrapper}>
              <select id="skillCategory" className={style.select}>
                <option value="">Выберите категорию</option>
              </select>
              <div className={style.selectIcon}>
                <ChevronDown />
              </div>
            </div>
          </div>

          <div className={style.fieldGroup}>
            <label className={style.label} htmlFor="skillSubcategory">
              Подкатегория навыка, которому хотите научиться
            </label>
            <div className={style.selectWrapper}>
              <select id="skillSubcategory" className={style.select}>
                <option value="">Выберите подкатегорию</option>
              </select>
              <div className={style.selectIcon}>
                <ChevronDown />
              </div>
            </div>
          </div>

          <div className={style.buttonsRow}>
            <button type="button" className={style.buttonBack}>
              Назад
            </button>
            <button type="submit" className={style.buttonContinue}>
              Продолжить
            </button>
          </div>
        </form>
      </div>
      <div className={style.rightColumn}>
        {/* Информационная секция будет здесь */}
      </div>
    </div>
  );
}