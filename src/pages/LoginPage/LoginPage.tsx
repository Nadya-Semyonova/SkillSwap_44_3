import { Link } from 'react-router-dom';
import Logo from '../../../public/img/LogoSvg/Logo';
import Cross from '../../../public/img/iconsSvg/Cross';
import LightBulb from '../../../public/img/IllustrationsSvg/LightBulb';
import styles from './LoginPage.module.css';
import ButtonDefault from '../../shared/ui/ButtonDefault/ButtonDefault';

// Заглушка для useController из react-hook-form
// Типизация для совместимости
interface ControllerField {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  ref: React.RefObject<HTMLInputElement>;
}

interface UseControllerResult {
  field: ControllerField;
}

// Заглушка функции useController
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
  // Используем заглушки useController
  const emailController = useController();
  const passwordController = useController();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <Logo />
          <span className={styles.brandName}>SkillSwap</span>
        </div>
        <div className={styles.buttonWrapperClose}>
          <ButtonDefault name="Закрыть" handleClick={() => {}} styleButton={styles.closeButton} />
          <Cross />
        </div>
      </header>
      <div className={styles.headline}>
        <h2 className={styles.title}>Вход</h2>
      </div>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formButtonsLogin}>
            <ButtonDefault
              name="Продолжить с Google"
              handleClick={() => {}}
              styleButton={styles.socialButton}
            />
            <ButtonDefault
              name="Продолжить с Apple"
              handleClick={() => {}}
              styleButton={styles.socialButton}
            />
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
              <input
                type="password"
                className={styles.input}
                placeholder="Введите ваш пароль"
                value={passwordController.field.value}
                onChange={passwordController.field.onChange}
                onBlur={passwordController.field.onBlur}
                ref={passwordController.field.ref}
              />
            </div>
          </div>
          <div className={styles.formButtonSubmit}>
            <ButtonDefault name="Войти" handleClick={() => {}} styleButton={styles.loginButton} />
            <Link to="/RegisterPage" className={styles.registerLink}>
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
