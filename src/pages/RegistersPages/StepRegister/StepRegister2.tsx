import ButtonDefault from '@shared/ui/ButtonDefault';
import { Input } from '@shared/ui/useInput';
import UserCircle from '@/shared/assets/images/IconsSvg/UserCircle';
import Add from '@/shared/assets/images/IconsSvg/Add';
import UserInfo from '@/shared/assets/images/IllustrationsSvg/UserInfo';
import { UserSelector } from '@/features/auth/UserCalendar/UserSelector';
import { ToggledSelect } from '@/shared/ui/ToggleSelector';
import styles from './StepRegister.module.css';

import type { StepRegister2Props } from '@/pages/RegistersPages/libs/types';

function StepRegister2({
  onNext,
  onBack,

  name,
  onNameChange,

  dateOfBirth,
  onDateOfBirthChange,

  gender,
  onGenderChange,

  city,
  cities,
  onCityChange,

  category,
  categories,
  onCategoryChange,

  subcategory,
  subcategories,
  onSubcategoryChange,

  avatar,
  setAvatar,
  errors,
}: StepRegister2Props) {
  // Проверка только для кнопки
  const isFormValid =
    name.trim() &&
    dateOfBirth &&
    gender &&
    city &&
    category &&
    subcategory &&
    !errors?.name &&
    !errors?.dateOfBirth &&
    !errors?.gender &&
    !errors?.city &&
    !errors?.category &&
    !errors?.subcategory;

  return (
    <div className={styles.content}>
      <div className={styles.containerForm}>
        <form className={styles.form}>
          <div className={styles.avatarContainer}>
            <button
              type="button"
              className={styles.avatarIcon}
              aria-label="Аватар пользователя"
              onClick={() => setAvatar()}
            >
              {avatar ? (
                <img src={avatar} alt="Аватар" className={styles.avatarUser} />
              ) : (
                <UserCircle />
              )}
            </button>

            <button type="button" className={styles.avatarPlus} aria-label="Добавить аватар">
              <Add />
            </button>
          </div>

          {/* Имя - оставляем как было */}
          <Input
            className={styles.inputField}
            title="Имя"
            placeholder="Введите ваше имя"
            value={name}
            onChange={onNameChange}
          />

          <div className={styles.rowFields}>
            {/* Дата рождения - оставляем как было */}
            <UserSelector bithDay={dateOfBirth} setBithDay={onDateOfBirthChange} />

            {/* Пол - оставляем как было */}
            <ToggledSelect
              className={styles.toggledSelectField}
              title="Пол"
              placeholder={gender || 'Не указан'}
              active={gender}
            >
              <button type="button" onClick={() => onGenderChange('Не указан')}>
                Не указан
              </button>
              <button type="button" onClick={() => onGenderChange('Мужской')}>
                Мужской
              </button>
              <button type="button" onClick={() => onGenderChange('Женский')}>
                Женский
              </button>
            </ToggledSelect>
          </div>

          {/* Город - оставляем как было */}
          <ToggledSelect
            className={styles.toggledSelectField}
            title="Город"
            placeholder={city || 'Не указан'}
            active={city}
          >
            {cities.map((c) => (
              <button key={c} type="button" onClick={() => onCityChange(c)}>
                {c}
              </button>
            ))}
          </ToggledSelect>

          {/* Категория - оставляем как было */}
          <ToggledSelect
            className={styles.toggledSelectField}
            title="Категория навыка, которому хотите научиться"
            placeholder={category || 'Выберите категорию'}
            active={category}
          >
            {categories.map((cat) => (
              <button key={cat} type="button" onClick={() => onCategoryChange(cat)}>
                {cat}
              </button>
            ))}
          </ToggledSelect>

          {/* Подкатегория - оставляем как было */}
          <ToggledSelect
            className={styles.toggledSelectField}
            title="Подкатегория навыка, которому хотите научиться"
            placeholder={subcategory || 'Выберите подкатегорию'}
            active={subcategory}
          >
            {subcategories.map((sub) => (
              <button key={sub} type="button" onClick={() => onSubcategoryChange(sub)}>
                {sub}
              </button>
            ))}
          </ToggledSelect>

          <div className={styles.buttonsRow}>
            <ButtonDefault
              type="button"
              name="Назад"
              variant="outline"
              styleButton={styles.button}
              handleClick={onBack}
            />

            {/* Только кнопка "Продолжить" меняем */}
            <ButtonDefault
              type="button"
              name="Продолжить"
              variant="continue"
              styleButton={`${styles.button} ${styles.buttonContinue} ${!isFormValid ? styles.buttonDisabled : ''}`}
              handleClick={isFormValid ? onNext : () => {}}
            />
          </div>
        </form>

        <div className={`${styles.onboarding} ${styles.onboardingStep2}`}>
          <div className={styles.iconWrapper}>
            <UserInfo />
          </div>

          <div className={styles.onboardingContent}>
            <h2 className={styles.onboardingTitle}>Расскажите немного о себе</h2>
            <p className={styles.onboardingText}>
              Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepRegister2;
