import UserCircle from '@public/img/IconsSvg/UserCircle';
import Add from '@public/img/IconsSvg/Add';
import Calendar from '@public/img/IconsSvg/Calendar';
import ChevronDown from '@public/img/IconsSvg/ChevronDown';
import UserInfo from '@public/img/IllustrationsSvg/UserInfo';
import ButtonDefault from '@shared/ui/ButtonDefault';
import style from './RegistrationStep2.module.css';

export function RegistrationStep2() {
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
            <label className={style.label} htmlFor="name">
              Имя
            </label>
            <input type="text" id="name" className={style.input} placeholder="Введите ваше имя" />
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
                <button
                  type="button"
                  className={style.inputIcon}
                  onClick={() => {}}
                  aria-label="Выбрать дату из календаря"
                >
                  <Calendar />
                </button>
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
                <button
                  type="button"
                  className={style.selectIcon}
                  onClick={() => {}}
                  aria-label="Открыть список выбора пола"
                >
                  <ChevronDown />
                </button>
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
              <button
                type="button"
                className={style.selectIcon}
                onClick={() => {}}
                aria-label="Открыть список выбора города"
              >
                <ChevronDown />
              </button>
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
              <button
                type="button"
                className={style.selectIcon}
                onClick={() => {}}
                aria-label="Открыть список выбора категории навыка"
              >
                <ChevronDown />
              </button>
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
              <button
                type="button"
                className={style.selectIcon}
                onClick={() => {}}
                aria-label="Открыть список выбора подкатегории навыка"
              >
                <ChevronDown />
              </button>
            </div>
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
