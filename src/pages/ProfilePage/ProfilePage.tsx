import { useEffect, useState } from 'react';
import userPhoto from '@shared/assets/images/userPhoto.png';
import Edit from '@/shared/assets/images/IconsSvg/Edit';
import GaleryEdit from '@/shared/assets/images/IconsSvg/GaleryEdit';
import { useDispatch, useSelector, type RootState } from '@/store/store';
import { Input } from '@/shared/ui/useInput/Input';
import ButtonDefault from '@/shared/ui/ButtonDefault/ButtonDefault';
import ToggledSelect from '@/shared/ui/ToggleSelector/ToggledSelect';
import { UserSelector } from '@/features/auth/UserCalendar/UserSelector';
import SideBar from '@/features/profile/SideBar/SideBar';

import styles from '@/pages/ProfilePage/ProfilePage.module.css';

import { getCitiesData } from '@/store/slices/userDataSlice/userDataSlice';

function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [about, setAbout] = useState(user?.about ?? '');
  const [gender, setGender] = useState(user?.gender ?? '');

  const genderOptions = [
    { value: 'female', label: 'Женский' },
    { value: 'male', label: 'Мужской' },
  ] as const;

  const genderLabel =
    genderOptions.find((option) => option.value === gender)?.label ?? 'Выберите пол';
  const isGenderSelected = Boolean(gender);

  const dispatch = useDispatch();

  const cities = useSelector((state: RootState) => state.users.cities ?? []);
  const [city, setCity] = useState(user?.city ?? '');
  const cityPlaceholder = city || 'Выберите город';

  useEffect(() => {
    dispatch(getCitiesData());
  }, [dispatch]);

  return (
    <section className={styles.profile}>
      <SideBar />

      <main className={styles.profileContainer}>
        <form className={styles.userForm}>
          <section className={styles.formSection}>
            <div className={styles.formRow}>
              <p className={styles.label}>Почта</p>

              <div className={styles.inputContainer}>
                <Input type="email" value={user?.email ?? ''} className={styles.inputFullWidth} />

                <span className={styles.editIcon}>
                  <Edit />
                </span>
              </div>
            </div>

            <div className={styles.passwordLink}>
              <a href="/change-password" className={styles.link}>
                Изменить пароль
              </a>
            </div>
          </section>

          <div className={styles.formRow}>
            <p className={styles.label}>Имя</p>

            <div className={styles.inputContainer}>
              <Input value={user?.name ?? ''} className={styles.inputFullWidth} />

              <span className={styles.editIcon}>
                <Edit />
              </span>
            </div>
          </div>

          <div className={styles.infoDateGender}>
            <div className={`${styles.formRow} ${styles.birthdateRow}`}>
              <div className={styles.inputContainer}>
                <UserSelector />
              </div>
            </div>

            <div
              className={`${styles.formRow} ${styles.genderSelect} ${
                isGenderSelected ? styles.genderSelected : ''
              }`}
            >
              <ToggledSelect title="Пол" placeholder={genderLabel}>
                <div className={styles.optionsStack}>
                  {genderOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`${styles.dropdownOption} ${
                        gender === option.value ? styles.optionActive : ''
                      }`}
                      onClick={() => setGender(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </ToggledSelect>
            </div>
          </div>

          <div
            className={`${styles.formRow} ${styles.citySelect} ${city ? styles.citySelectFilled : ''}`}
          >
            <ToggledSelect title="Город" placeholder={cityPlaceholder}>
              <div className={styles.optionsStack}>
                {cities.map((cityName) => (
                  <button
                    key={cityName}
                    type="button"
                    className={`${styles.dropdownOption} ${city === cityName ? styles.optionActive : ''}`}
                    onClick={() => setCity(cityName)}
                  >
                    {cityName}
                  </button>
                ))}
              </div>
            </ToggledSelect>
          </div>

          <div className={`${styles.formRow} ${styles.aboutRow}`}>
            <p className={styles.label}>О себе</p>

            <div className={styles.textareaContainer}>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className={styles.textareaField}
                rows={4}
              />

              <span className={`${styles.editIcon} ${styles.aboutEditIcon}`}>
                <Edit />
              </span>
            </div>
          </div>

          <div className={styles.saveButtonContainer}>
            <ButtonDefault
              name="Сохранить"
              type="button"
              styleButton={styles.saveButton}
              handleClick={() => {}}
            />
          </div>
        </form>

        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            <img
              src={user?.avatar || userPhoto}
              alt="Аватар пользователя"
              className={styles.userPhoto}
            />

            <div className={styles.editPhotoControl}>
              <ButtonDefault
                name=""
                type="button"
                styleButton={styles.editPhotoButton}
                handleClick={() => {}}
              />

              <span className={styles.editPhotoIcon}>
                <GaleryEdit />
              </span>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default ProfilePage;
