import ButtonDefault from '@shared/ui/ButtonDefault';
import GaleryAdd from '@/shared/assets/images/IconsSvg/GaleryAdd';
import SchoolBoard from '@/shared/assets/images/IllustrationsSvg/SchoolBoard';
import { Input } from '@/shared/ui/useInput';
import { ToggledSelect } from '@/shared/ui/ToggleSelector';
import { Textarea } from '@/shared/ui/Textarea/Textarea';
import styles from './StepRegister.module.css';

import type { StepRegister3Props } from '@/pages/RegistersPages/libs/types';

function StepRegister3({
  onBack,
  onNext,

  skillName,
  onSkillNameChange,

  category,
  categories,
  onCategoryChange,

  subcategory,
  subcategories,
  onSubcategoryChange,

  description,
  onDescriptionChange,

  setPhotos,
  errors,
}: StepRegister3Props) {
  // Проверка только для кнопки (без проверки фото)
  const isFormValid =
    skillName.trim() &&
    category &&
    subcategory &&
    description.trim() &&
    !errors?.skillName &&
    !errors?.category &&
    !errors?.subcategory &&
    !errors?.description;

  return (
    <div className={styles.content}>
      <div className={styles.containerForm}>
        <div className={styles.form}>
          <Input
            className={styles.inputField}
            title="Название навыка"
            placeholder="Введите название вашего навыка"
            value={skillName}
            onChange={onSkillNameChange}
          />

          <ToggledSelect
            className={styles.toggledSelectField}
            title="Категория навыка"
            placeholder={category || 'Выберите категорию навыка'}
            active={category}
          >
            {categories.map((cat) => (
              <button key={cat} type="button" onClick={() => onCategoryChange(cat)}>
                {cat}
              </button>
            ))}
          </ToggledSelect>

          <ToggledSelect
            className={styles.toggledSelectField}
            title="Подкатегория навыка"
            placeholder={subcategory || 'Выберите подкатегорию навыка'}
            active={subcategory}
          >
            {subcategories.map((sub) => (
              <button key={sub} type="button" onClick={() => onSubcategoryChange(sub)}>
                {sub}
              </button>
            ))}
          </ToggledSelect>

          <Textarea
            className={styles.textarea}
            type="text"
            title="Описание"
            placeholder="Коротко опишите, чему можете научить"
            maxLength={250}
            value={description}
            onChange={onDescriptionChange}
          />

          <div className={styles.upload}>
            <p className={styles.uploadText}>Перетащите или выберите изображения навыка</p>

            <div className={styles.uploadLink}>
              <span className={styles.uploadLinkIcon} aria-hidden="true">
                <GaleryAdd />
              </span>
              <button className={styles.buttonAddPhotos} onClick={() => setPhotos()}>
                Выбрать изображения
              </button>
            </div>
          </div>

          <div className={styles.actions}>
            <ButtonDefault
              type="button"
              name="Назад"
              styleButton={`${styles.button} ${styles.buttonStep3}`}
              handleClick={onBack}
            />

            {/* Только кнопку "Продолжить" меняем */}
            <ButtonDefault
              type="button"
              name="Продолжить"
              styleButton={`${styles.button} ${styles.buttonContinue} ${styles.buttonStep3} ${!isFormValid ? styles.buttonDisabled : ''}`}
              handleClick={isFormValid ? onNext : () => {}}
            />
          </div>
        </div>

        <div className={styles.onboarding}>
          <SchoolBoard />
          <h2 className={styles.previewTitle}>Укажите, чем вы готовы поделиться</h2>
          <p className={styles.previewText}>
            Так другие люди смогут увидеть ваши предложения и предложить вам обмен!
          </p>
        </div>
      </div>
    </div>
  );
}

export default StepRegister3;
