import ButtonDefault from '@shared/ui/ButtonDefault';
import { Input } from '@shared/ui/useInput';
import UserCircle from '@/shared/assets/images/IconsSvg/UserCircle';
import Add from '@/shared/assets/images/IconsSvg/Add';
import UserInfo from '@/shared/assets/images/IllustrationsSvg/UserInfo';
import { UserSelector } from '@/features/auth/UserCalendar/UserSelector';
import { ToggledSelect } from '@/shared/ui/ToggleSelector';
import styles from './StepRegister2.module.css';

type Props = {
  onNext: () => void;
  onBack: () => void;
};

function StepRegister2({ onNext, onBack }: Props) {
  const handleAvatarClick = () => {};
  const handleAvatarAdd = () => {};
  const handleGenderNotSpecified = () => {};
  const handleGenderMale = () => {};
  const handleGenderFemale = () => {};
  const handleCitySelect = () => {};
  const handleSkillCategorySelect = () => {};
  const handleSkillSubcategorySelect = () => {};
  const handleNameChange = () => {};

  return (
    <div className={styles.content}>
      <form className={styles.form}>
        <div className={styles.avatarContainer}>
          <button
            type="button"
            className={styles.avatarIcon}
            onClick={handleAvatarClick}
            aria-label="Аватар пользователя"
          >
            <UserCircle />
          </button>

          <button
            type="button"
            className={styles.avatarPlus}
            onClick={handleAvatarAdd}
            aria-label="Добавить аватар"
          >
            <Add />
          </button>
        </div>

        <Input title="Имя" placeholder="Введите ваше имя" onChange={handleNameChange} />

        <div className={styles.rowFields}>
          <UserSelector />

          <ToggledSelect title="Пол" placeholder="Не указан">
            <button type="button" onClick={handleGenderNotSpecified}>
              Не указан
            </button>
            <button type="button" onClick={handleGenderMale}>
              Мужской
            </button>
            <button type="button" onClick={handleGenderFemale}>
              Женский
            </button>
          </ToggledSelect>
        </div>

        <ToggledSelect title="Город" placeholder="Не указан">
          <button type="button" onClick={handleCitySelect}>
            Не указан
          </button>
        </ToggledSelect>

        <ToggledSelect
          title="Категория навыка, которому хотите научиться"
          placeholder="Выберите категорию"
        >
          <button type="button" onClick={handleSkillCategorySelect}>
            Выберите категорию
          </button>
        </ToggledSelect>

        <ToggledSelect
          title="Подкатегория навыка, которому хотите научиться"
          placeholder="Выберите подкатегорию"
        >
          <button type="button" onClick={handleSkillSubcategorySelect}>
            Выберите подкатегорию
          </button>
        </ToggledSelect>

        <div className={styles.buttonsRow}>
          <ButtonDefault
            name="Назад"
            variant="outline"
            styleButton={styles.buttonBack}
            handleClick={onBack}
          />

          <ButtonDefault
            name="Продолжить"
            variant="continue"
            styleButton={styles.buttonContinue}
            handleClick={onNext}
          />
        </div>
      </form>

      <div className={styles.onboarding}>
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
  );
}

export default StepRegister2;
