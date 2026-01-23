import Edit from '@assets/img/IconsSvg/Edit';
import Calendar from '@assets/img/IconsSvg/Calendar';
import ChevronDown from '@assets/img/IconsSvg/ChevronDown';
import GaleryEdit from '@assets/img/IconsSvg/GaleryEdit';
import userPhoto from '@public/img/userPhoto.png';
import styles from './ProfileData.module.css';

function ProfileData() {
  return (
    <div className={styles.profileContainer}>
      <form className={styles.userForm}>
        <div className={styles.formSection}>
          <div className={styles.formRow}>
            <label htmlFor="email" className={styles.label}>
              Почта
              <div className={styles.inputContainer}>
                <input
                  id="email"
                  type="email"
                  className={styles.inputField}
                  defaultValue="example@gmail.com"
                  readOnly
                />
                <span className={styles.editIcon}>
                  <Edit />
                </span>
              </div>
            </label>
          </div>

          <div className={styles.passwordLink}>
            <a href="/change-password" className={styles.link}>
              Изменить пароль
            </a>
          </div>
        </div>

        <div className={styles.formRow}>
          <label htmlFor="name" className={styles.label}>
            Имя
            <div className={styles.inputContainer}>
              <input
                id="name"
                type="text"
                className={styles.inputField}
                defaultValue="Иван"
                readOnly
              />
              <span className={styles.editIcon}>
                <Edit />
              </span>
            </div>
          </label>
        </div>

        <div className={styles.infoDateGender}>
          <div className={styles.formRow}>
            <label htmlFor="birthday" className={styles.label}>
              Дата рождения
              <div className={styles.inputContainer}>
                <input
                  id="birthday"
                  type="text"
                  className={styles.inputField}
                  defaultValue="ДД.ММ.ГГГГ"
                  readOnly
                />
                <span className={styles.calendarIcon}>
                  <Calendar />
                </span>
              </div>
            </label>
          </div>

          <div className={styles.formRow}>
            <label htmlFor="gender" className={styles.label}>
              Пол
              <div className={styles.inputContainer}>
                <select id="gender" className={styles.selectField} defaultValue="female">
                  <option value="female">Женский</option>
                  <option value="male">Мужской</option>
                </select>
                <span className={styles.dropdownIcon}>
                  <ChevronDown />
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className={styles.formRow}>
          <label htmlFor="city" className={styles.label}>
            Город
            <div className={styles.inputContainer}>
              <select id="city" className={styles.selectField} defaultValue="moscow">
                <option value="moscow">Москва</option>
              </select>
              <span className={styles.dropdownIcon}>
                <ChevronDown />
              </span>
            </div>
          </label>
        </div>

        <div className={`${styles.formRow} ${styles.aboutRow}`}>
          <label htmlFor="about" className={styles.label}>
            О себе
            <div className={styles.textareaContainer}>
              <textarea
                id="about"
                className={styles.textareaField}
                defaultValue="Расскажите о себе"
                readOnly
                rows={4}
              />
              <span className={`${styles.editIcon} ${styles.aboutEditIcon}`}>
                <Edit />
              </span>
            </div>
          </label>
        </div>

        <div className={styles.saveButtonContainer}>
          <button className={styles.saveButton} type="submit" disabled>
            Сохранить
          </button>
        </div>
      </form>

      <div className={styles.avatarSection}>
        <div className={styles.avatar}>
          <img src={userPhoto} alt="Аватар пользователя" className={styles.userPhoto} />
        </div>
        <button
          className={styles.editPhotoButton}
          type="button"
          disabled
          aria-label="Изменить фото"
        >
          <GaleryEdit />
        </button>
      </div>
    </div>
  );
}

export default ProfileData;
