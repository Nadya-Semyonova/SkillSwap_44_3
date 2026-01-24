import userPhoto from '@shared/assets/images/userPhoto.png';
import { useEffect } from 'react';
import Edit from '@/shared/assets/images/IconsSvg/Edit';
import Calendar from '@/shared/assets/images/IconsSvg/Calendar';
import ChevronDown from '@/shared/assets/images/IconsSvg/ChevronDown';
import GaleryEdit from '@/shared/assets/images/IconsSvg/GaleryEdit';
import styles from './ProfileData.module.css';
import { useSelector, type RootState } from '@/store/store';

function ProfileData() {
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {}, [user]);

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
                  value={user?.email}
                  className={styles.inputField}
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
                value={user?.name}
                className={styles.inputField}
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
                  value={user?.dateOfBirth}
                  className={styles.inputField}
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
                <select id="gender" className={styles.selectField} value={user?.gender}>
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
                <option value={user?.city}>{user?.city}</option>
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
                value={user?.about}
                className={styles.textareaField}
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
          <img
            src={user?.avatar || userPhoto}
            alt="Аватар пользователя"
            className={styles.userPhoto}
          />
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
