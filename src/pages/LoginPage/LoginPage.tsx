import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/lib/constants/routes';
import ButtonDefault from '@shared/ui/ButtonDefault';
import Google from '@assets/img/IconsSvg/Google';
import Apple from '@assets/img/IconsSvg/Apple';
import Eye from '@assets/img/IconsSvg/Eye';
import LightBulb from '@assets/img/IllustrationsSvg/LightBulb';
import HeaderAuth from '@features/auth/registration/ui/HeaderAuth/HeaderAuth';
import styles from './LoginPage.module.css';

interface ControllerField {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  ref: React.RefObject<HTMLInputElement>;
}

interface UseControllerResult {
  field: ControllerField;
}

const useController = (): UseControllerResult => {
  return {
    field: {
      value: '',
      onChange: () => {},
      onBlur: () => {},
      ref: { current: null },
    },
  };
};

function LoginPage() {
  const emailController = useController();
  const passwordController = useController();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <HeaderAuth />
      <div className={styles.headline}>
        <h2 className={styles.title}>Вход</h2>
      </div>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formButtonsLogin}>
            <button
              className={`${styles.socialButton} ${styles.withIcon}`}
              onClick={() => {}}
              type="button"
            >
              <div className={styles.socialButtonIcon}>
                <Google />
              </div>
              <p className={styles.socialText}>Продолжить с Google</p>
            </button>

            <button
              className={`${styles.socialButton} ${styles.withIcon}`}
              onClick={() => {}}
              type="button"
            >
              <div className={styles.socialButtonIcon}>
                <Apple />
              </div>
              <p className={styles.socialText}>Продолжить с Apple</p>
            </button>
          </div>
          <p className={styles.formText}>или</p>
          <div className={styles.formInput}>
            <div className={styles.field}>
              <div className={styles.label}>Email</div>
              <input
                type="email"
                className={styles.input}
                placeholder="Введите email"
                value={emailController.field.value}
                onChange={emailController.field.onChange}
                onBlur={emailController.field.onBlur}
                ref={emailController.field.ref}
              />
            </div>
            <div className={styles.field}>
              <div className={styles.label}>Пароль</div>
              <div className={styles.inputWrapper}>
                <input
                  type="password"
                  className={styles.input}
                  placeholder="Введите ваш пароль"
                  value={passwordController.field.value}
                  onChange={passwordController.field.onChange}
                  onBlur={passwordController.field.onBlur}
                  ref={passwordController.field.ref}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => {}}
                  aria-label="Показать пароль"
                >
                  <Eye />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.formButtonSubmit}>
            <ButtonDefault name="Войти" handleClick={() => {}} styleButton={styles.loginButton} />
            <Link to={ROUTES.REGISTER} className={styles.registerLink}>
              Зарегистрироваться
            </Link>
          </div>
        </form>
        <div className={styles.onboarding}>
          <div className={styles.iconWrapper}>
            <LightBulb />
          </div>
          <div className={styles.onboardingContent}>
            <h2 className={styles.onboardingTitle}>С возвращением в SkillSwap!</h2>
            <p className={styles.onboardingText}>
              Обменивайтесь знаниями и навыками с другими людьми
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
