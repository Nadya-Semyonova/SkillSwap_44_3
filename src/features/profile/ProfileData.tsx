import { useState } from 'react';
import userPhoto from '@shared/assets/images/userPhoto.png';
import Edit from '@/shared/assets/images/IconsSvg/Edit';
import GaleryEdit from '@/shared/assets/images/IconsSvg/GaleryEdit';
import { useSelector, type RootState } from '@/store/store';
import { Input } from '@/shared/ui/useInput/Input';
import ButtonDefault from '@/shared/ui/ButtonDefault/ButtonDefault';
import ToggledSelect from '@/shared/ui/ToggleSelector/ToggledSelect';
import { UserSelector } from '@/features/auth/UserCalendar/UserSelector';

import styles from '@/features/profile/ProfileData.module.css';
import { profileText, genderOptions } from '@/features/profile/ProfileDataConstants';

function ProfileData() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [about, setAbout] = useState(user?.about ?? '');
  const [gender, setGender] = useState(user?.gender ?? '');

  const cities = useSelector((state: RootState) => state.users.cities ?? []);
  const [city, setCity] = useState(user?.city ?? '');

  const genderLabel =
    genderOptions.find((option) => option.value === gender)?.label ?? profileText.genderPlaceholder;

  const isGenderSelected = Boolean(gender);
  const cityPlaceholder = city || profileText.cityPlaceholder;

  return (
    <main className={styles.profileContainer}>
      <form className={styles.userForm}>
        <section className={styles.formSection}>
          <div className={styles.formRow}>
            <p className={styles.label}>{profileText.email}</p>

            <div className={styles.inputContainer}>
              <Input type="email" value={user?.email ?? ''} className={styles.inputFullWidth} />

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
            <Input value={user?.name ?? ''} className={styles.inputFullWidth} />

            <span className={styles.editIcon}>
              <Edit />
            </span>
          </div>
        </div>

        <div className={styles.infoDateGender}>
          <div className={styles.formRow}>
            <UserSelector />
          </div>

          <div
            className={`${styles.formRow} ${styles.genderSelect} ${
              isGenderSelected ? styles.genderSelected : ''
            }`}
          >
            <ToggledSelect
              title={profileText.genderTitle}
              placeholder={genderLabel}
              active={user?.gender}
            >
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
          <ToggledSelect
            title={profileText.cityTitle}
            placeholder={cityPlaceholder}
            active={user?.city}
          >
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
            styleButton={styles.saveButton}
            handleClick={() => {}}
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
