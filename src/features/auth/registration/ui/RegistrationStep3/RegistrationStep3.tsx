import Logo from '@public/img/LogoSvg/Logo';
import ChevronDown from '@public/img/IconsSvg/ChevronDown';
import GaleryAdd from '@public/img/IconsSvg/GaleryAdd';
import SchoolBoard from '@public/img/IllustrationsSvg/SchoolBoard';
import ButtonDefault from '../../../../../shared/ui/ButtonDefault/ButtonDefault';
import styles from './RegistrationStep3.module.css';

export default function RegistrationStep3() {
  return (
    <section className={styles.registrationStep3}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <Logo />
            <span className={styles.brandText}>SkillSwap</span>
          </div>

          <div className={styles.progress}>
            <p className={styles.progressTitle}>Шаг 3 из 3</p>

            <div className={styles.progressBars} aria-hidden="true">
              <span className={styles.progressBar} />
              <span className={styles.progressBar} />
              <span className={styles.progressBar} />
            </div>
          </div>

          <button className={styles.close} type="button">
            <span className={styles.closeText}>Закрыть</span>
            <span className={styles.closeIcon} aria-hidden="true">
              ×
            </span>
          </button>
        </div>
      </header>

      <div className={styles.window}>
        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.form}>
              <label className={styles.field} htmlFor="skillName">
                <span className={styles.label}>Название навыка</span>
                <input
                  className={styles.input}
                  id="skillName"
                  name="skillName"
                  type="text"
                  placeholder="Введите название вашего навыка"
                />
              </label>

              <label className={styles.field} htmlFor="skillCategory">
                <span className={styles.label}>Категория навыка</span>

                <div className={styles.selectWrap}>
                  <select
                    className={styles.select}
                    id="skillCategory"
                    name="skillCategory"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Выберите категорию навыка
                    </option>
                  </select>

                  <span className={styles.selectIcon} aria-hidden="true">
                    <ChevronDown />
                  </span>
                </div>
              </label>

              <label className={styles.field} htmlFor="skillSubcategory">
                <span className={styles.label}>Подкатегория навыка</span>

                <div className={styles.selectWrap}>
                  <select
                    className={styles.select}
                    id="skillSubcategory"
                    name="skillSubcategory"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Выберите подкатегорию навыка
                    </option>
                  </select>

                  <span className={styles.selectIcon} aria-hidden="true">
                    <ChevronDown />
                  </span>
                </div>
              </label>

              <label className={styles.field} htmlFor="skillDescription">
                <span className={styles.label}>Описание</span>
                <textarea
                  className={styles.textarea}
                  id="skillDescription"
                  name="skillDescription"
                  placeholder="Коротко опишите, чему можете научить"
                />
              </label>

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
                  handleClick={() => {}}
                />
                <ButtonDefault
                  name="Продолжить"
                  styleButton={`${styles.actionButton} ${styles.actionButtonContinue}`}
                  handleClick={() => {}}
                />
              </div>
            </div>
          </div>

          <div className={styles.preview}>
            <div className={styles.previewInner}>
              <SchoolBoard />
              <h2 className={styles.previewTitle}>Укажите, чем вы готовы поделиться</h2>
              <p className={styles.previewText}>
                Так другие люди смогут увидеть ваши предложения и предложить вам обмен!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
