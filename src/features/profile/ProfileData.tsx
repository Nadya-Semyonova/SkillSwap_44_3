import { useState, useMemo } from 'react';
import userPhoto from '@shared/assets/images/userPhoto.png';
import Edit from '@/shared/assets/images/IconsSvg/Edit';
import GaleryEdit from '@/shared/assets/images/IconsSvg/GaleryEdit';
import { useDispatch, useSelector, type RootState } from '@/store/store';
import { Input } from '@/shared/ui/useInput/Input';
import ButtonDefault from '@/shared/ui/ButtonDefault/ButtonDefault';
import ToggledSelect from '@/shared/ui/ToggleSelector/ToggledSelect';
import { UserSelector } from '@/features/auth/UserCalendar/UserSelector';

import styles from '@/features/profile/ProfileData.module.css';
import { profileText, genderOptions } from '@/features/profile/ProfileDataConstants';
import { saveProfileEdit, setUserData } from '@/store/slices/profileEditSlice/profileEditSlice';
import type { IEditUser } from '@/types/types';

function ProfileData() {
  const user = useSelector((state: RootState) => state.auth.user);
  const citiesData = useSelector((state: RootState) => state.users.cities);
  const cities = useMemo(() => citiesData || [], [citiesData]);
  const [email, setEmail] = useState<string>(user?.email || '');
  const [name, setName] = useState<string>(user?.name || '');
  const [bithDay, setBirthDay] = useState<string>(user?.dateOfBirth || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [city, setCity] = useState(user?.city || '');
  const [about, setAbout] = useState(user?.about || '');
  const dispatch = useDispatch();

  const genderLabel = useMemo(
    () =>
      genderOptions.find((option) => option.value === gender)?.label ??
      profileText.genderPlaceholder,
    [gender]
  );

  const isGenderSelected = useMemo(() => Boolean(gender), [gender]);

  const cityPlaceholder = useMemo(() => city || profileText.cityPlaceholder, [city]);

  const buttonActive =
    email !== user?.email ||
    name !== user.name ||
    bithDay !== user.dateOfBirth ||
    gender !== user.gender ||
    city !== user.city ||
    about !== user.about;

  const handleClickSave = () => {
    const userEdit: IEditUser = {
      email,
      name,
      dateOfBirth: bithDay,
      gender,
      city,
      about,
    };
    dispatch(setUserData(userEdit));
    dispatch(saveProfileEdit());
  };

  return (
    <main className={styles.profileContainer}>
      <form className={styles.userForm}>
        <section className={styles.formSection}>
          <div className={styles.formRow}>
            <p className={styles.label}>{profileText.email}</p>

            <div className={styles.inputContainer}>
              <Input
                type="email"
                value={email}
                className={styles.inputFullWidth}
                onChange={setEmail}
              />
              <span className={styles.editIcon}>
                <Edit />
              </span>
            </div>
          </div>

          <div className={styles.passwordLink}>
            <a href="/change-password" className={styles.link}>
              {profileText.changePassword}
            </a>
          </div>
        </section>

        <div className={styles.formRow}>
          <p className={styles.label}>{profileText.name}</p>

          <div className={styles.inputContainer}>
            <Input value={name} className={styles.inputFullWidth} onChange={setName} />

            <span className={styles.editIcon}>
              <Edit />
            </span>
          </div>
        </div>

        <div className={styles.infoDateGender}>
          <div className={styles.formRow}>
            <UserSelector bithDay={bithDay} setBithDay={setBirthDay} />
          </div>

          <div
            className={`${styles.formRow} ${styles.genderSelect} ${
              isGenderSelected ? styles.genderSelected : ''
            }`}
          >
            <ToggledSelect
              title={profileText.genderTitle}
              placeholder={genderLabel}
              active={gender}
            >
              <div className={styles.optionsStack}>
                {genderOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`${styles.dropdownOption} ${
                      gender === option.value ? styles.optionActive : ''
                    }`}
                    onClick={() => setGender(option.label)}
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
          <ToggledSelect title={profileText.cityTitle} placeholder={cityPlaceholder} active={city}>
            <div className={styles.optionsStack}>
              {cities.map((cityName) => (
                <button
                  key={cityName}
                  type="button"
                  className={`${styles.dropdownOption} ${
                    city === cityName ? styles.optionActive : ''
                  }`}
                  onClick={() => setCity(cityName)}
                >
                  {cityName}
                </button>
              ))}
            </div>
          </ToggledSelect>
        </div>

        <div className={`${styles.formRow} ${styles.aboutRow}`}>
          <p className={styles.label}>{profileText.about}</p>

          <div className={styles.textareaContainer}>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className={styles.textareaField}
              rows={4}
            />

            <span className={styles.editIcon}>
              <Edit />
            </span>
          </div>
        </div>

        <div className={styles.saveButtonContainer}>
          <ButtonDefault
            name={profileText.save}
            type="button"
            styleButton={`${styles.saveButton} ${buttonActive ? styles.saveButtonActive : ''}`} // доделать стили
            handleClick={handleClickSave}
            status={buttonActive}
          />
        </div>
      </form>

      <div className={styles.avatarSection}>
        <div className={styles.avatar}>
          <img
            src={user?.avatar || userPhoto}
            alt={profileText.userAvatarAlt}
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
  );
}

export default ProfileData;
