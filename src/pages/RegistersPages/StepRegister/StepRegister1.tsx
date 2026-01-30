import ButtonDefault from '@shared/ui/ButtonDefault';
import { Input } from '@shared/ui/useInput';
import Google from '@/shared/assets/images/IconsSvg/Google';
import Apple from '@/shared/assets/images/IconsSvg/Apple';
import Eye from '@/shared/assets/images/IconsSvg/Eye';
import LightBulb from '@/shared/assets/images/IllustrationsSvg/LightBulb';
import styles from './StepRegister.module.css';

type Props = {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onNext: () => void;
};

function StepRegister1({ email, password, onEmailChange, onPasswordChange, onNext }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className={styles.content}>
      <div className={styles.containerForm}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formButtonsLogin}>
            <ButtonDefault
              name="Продолжить с Google"
              type="button"
              styleButton={styles.socialButton}
              aria-label="Войти с помощью Google"
              handleClick={() => {}}
            >
              <Google />
              <span className={styles.socialText}>Продолжить с Google</span>
            </ButtonDefault>

            <ButtonDefault
              name="Продолжить с Apple"
              type="button"
              styleButton={styles.socialButton}
              aria-label="Войти с помощью Apple"
              handleClick={() => {}}
            >
              <Apple />
              <span className={styles.socialText}>Продолжить с Apple</span>
            </ButtonDefault>
          </div>

          <p className={styles.formText}>или</p>

          <div className={styles.formInput}>
            <Input
              className={styles.inputField}
              title="Email"
              placeholder="Введите email"
              value={email}
              onChange={onEmailChange}
              type="email"
            />

            <Input
              className={styles.inputField}
              title="Пароль"
              placeholder="Придумайте надежный пароль"
              value={password}
              onChange={onPasswordChange}
              type="password"
            />

            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => {}}
              aria-label="Показать пароль"
            >
              <Eye />
            </button>

            <p className={styles.passwordText}>Пароль должен содержать не менее 8 знаков</p>
          </div>

          <ButtonDefault
            name="Далее"
            type="submit"
            styleButton={styles.loginButton}
            aria-label="Продолжить"
          />
        </form>

        <div className={styles.onboarding}>
          <LightBulb />
          <h2 className={`${styles.onboardingTitle} ${styles.onboardingTitleStep1}`}>
            Добро пожаловать в SkillSwap!
          </h2>
          <p className={`${styles.onboardingText} ${styles.onboardingTextStep1}`}>
            Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми
          </p>
        </div>
      </div>
    </div>
  );
}

export default StepRegister1;
