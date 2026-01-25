import ButtonDefault from '@shared/ui/ButtonDefault';
import { Input } from '@shared/ui/useInput';
import UserCircle from '@/shared/assets/images/IconsSvg/UserCircle';
import Add from '@/shared/assets/images/IconsSvg/Add';
import UserInfo from '@/shared/assets/images/IllustrationsSvg/UserInfo';
import { UserSelector } from '@/features/auth/UserCalendar/UserSelector';
import { ToggledSelect } from '@/shared/ui/ToggleSelector';
import style from './RegistrationStep2.module.css';

export function RegistrationStep2() {
  // Заглушки для обработчиков
  const handleAvatarClick = () => {};
  const handleAvatarAdd = () => {};
  const handleGenderNotSpecified = () => {};
  const handleGenderMale = () => {};
  const handleGenderFemale = () => {};
  const handleCitySelect = () => {};
  const handleSkillCategorySelect = () => {};
  const handleSkillSubcategorySelect = () => {};
  const handleBack = () => {};
  const handleContinue = () => {};
  const handleNameChange = () => {
    // TODO: Implement name change handler
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <form className={style.form}>
          <div className={style.avatarContainer}>
            <button
              type="button"
              className={style.avatarIcon}
              onClick={handleAvatarClick}
              aria-label="Аватар пользователя"
            >
              <UserCircle />
            </button>
            <button
              type="button"
              className={style.avatarPlus}
              onClick={handleAvatarAdd}
              aria-label="Добавить аватар"
            >
              <Add />
            </button>
          </div>

          <Input title="Имя" placeholder="Введите ваше имя" onChange={handleNameChange} />

          <div className={style.rowFields}>
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

          <div className={style.buttonsRow}>
            <ButtonDefault
              name="Назад"
              handleClick={handleBack}
              variant="outline"
              styleButton={style.buttonBack}
            />
            <ButtonDefault
              name="Продолжить"
              handleClick={handleContinue}
              variant="continue"
              styleButton={style.buttonContinue}
            />
          </div>
        </form>
        <div className={style.onboarding}>
          <div className={style.iconWrapper}>
            <UserInfo />
          </div>
          <div className={style.onboardingContent}>
            <h2 className={style.onboardingTitle}>Расскажите немного о себе</h2>
            <p className={style.onboardingText}>
              Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
