import ButtonDefault from '@shared/ui/ButtonDefault/ButtonDefault';
import GaleryAdd from '@/shared/assets/images/IconsSvg/GaleryAdd';
import SchoolBoard from '@/shared/assets/images/IllustrationsSvg/SchoolBoard';
import { Input } from '@/shared/ui/useInput';
import { ToggledSelect } from '@/shared/ui/ToggleSelector';
import { Textarea } from '@/shared/ui/Textarea/Textarea';
import styles from './StepRegister3.module.css';

type Props = {
  onBack: () => void;
};

function StepRegister3({ onBack }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.form}>
        <Input
          className={styles.inputField}
          title="Название навыка"
          placeholder="Введите название вашего навыка"
        />

        <ToggledSelect title="Категория навыка" placeholder="Выберите категорию навыка">
          заглушка
        </ToggledSelect>

        <ToggledSelect title="Подкатегория навыка" placeholder="Выберите подкатегорию навыка">
          заглушка
        </ToggledSelect>

        <Textarea
          className={styles.textarea}
          type="text"
          title="Описание"
          placeholder="Коротко опишите, чему можете научить"
          maxLength={250}
        />

        <div className={styles.upload}>
          <p className={styles.uploadText}>Перетащите или выберите изображения навыка</p>

          <a className={styles.uploadLink} href="/">
            <span className={styles.uploadLinkIcon} aria-hidden="true">
              <GaleryAdd />
            </span>
            <span>Выбрать изображения</span>
          </a>
        </div>

        <div className={styles.actions}>
          <ButtonDefault
            name="Назад"
            styleButton={`${styles.actionButton} ${styles.actionButtonOutline}`}
            handleClick={onBack}
          />

          <ButtonDefault
            name="Продолжить"
            styleButton={`${styles.actionButton} ${styles.actionButtonContinue}`}
            handleClick={() => {}}
          />
        </div>
      </div>

      <div className={styles.previewInner}>
        <SchoolBoard />
        <h2 className={styles.previewTitle}>Укажите, чем вы готовы поделиться</h2>
        <p className={styles.previewText}>
          Так другие люди смогут увидеть ваши предложения и предложить вам обмен!
        </p>
      </div>
    </div>
  );
}

export default StepRegister3;
