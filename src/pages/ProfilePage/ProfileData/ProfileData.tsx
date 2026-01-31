import userPhoto from '@shared/assets/images/userPhoto.png';
import Edit from '@/shared/assets/images/IconsSvg/Edit';
import GaleryEdit from '@/shared/assets/images/IconsSvg/GaleryEdit';
import { Input } from '@/shared/ui/useInput/Input';
import ButtonDefault from '@/shared/ui/ButtonDefault/ButtonDefault';
import ToggledSelect from '@/shared/ui/ToggleSelector/ToggledSelect';
import { UserSelector } from '@/features/auth/UserCalendar/UserSelector';
import styles from '@/pages/ProfilePage/ProfileData/ProfileData.module.css';
import { profileText, genderOptions } from '@/pages/ProfilePage/ProfileData/ProfileDataConstants';
import { useProfileData } from '@/pages/ProfilePage/ProfileData/libs/useProfileData';

function ProfileData() {
  const {
    user,
    email,
    setEmail,
    name,
    setName,
    bithDay,
    setBirthDay,
    gender,
    setGender,
    city,
    setCity,
    about,
    setAbout,
    cities,
    genderLabel,
    isGenderSelected,
    cityPlaceholder,
    buttonActive,
    handleClickSave,
    emailEditable,
    setEmailEditable,
    nameEditable,
    setNameEditable,
    aboutEditable,
    setAboutEditable,
  } = useProfileData();

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
                readOnly={!emailEditable}
              />
              <button
                type="button"
                className={styles.editIcon}
                onClick={() => setEmailEditable(true)}
                aria-label="Редактировать почту"
              >
                <Edit />
              </button>
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
            <Input
              value={name}
              className={styles.inputFullWidth}
              onChange={setName}
              readOnly={!nameEditable}
            />
            <button
              type="button"
              className={styles.editIcon}
              onClick={() => setNameEditable(true)}
              aria-label="Редактировать имя"
            >
              <Edit />
            </button>
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
              readOnly={!aboutEditable}
            />
            <button
              type="button"
              className={styles.editIcon}
              onClick={() => setAboutEditable(true)}
              aria-label="Редактировать поле О себе"
            >
              <Edit />
            </button>
          </div>
        </div>

        <div className={styles.saveButtonContainer}>
          <ButtonDefault
            name={profileText.save}
            type="button"
            styleButton={`${styles.saveButton} ${buttonActive ? styles.saveButtonActive : ''}`}
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
