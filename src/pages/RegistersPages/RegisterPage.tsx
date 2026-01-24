import { useState } from 'react';
import ButtonDefault from '@shared/ui/ButtonDefault';
import { Input } from '@shared/ui/useInput';
import Google from '@/shared/assets/images/IconsSvg/Google';
import Apple from '@/shared/assets/images/IconsSvg/Apple';
import Eye from '@/shared/assets/images/IconsSvg/Eye';
import LightBulb from '@/shared/assets/images/IllustrationsSvg/LightBulb';
import styles from './RegisterPage.module.css';
import HeaderRegister from '@/features/auth/HeaderAuth/HeaderAuth';

function RegisterPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <HeaderRegister />
      <div className={styles.progressBarWrapper}>
        <h2 className={styles.title}>Шаг 1 из 3</h2>
        <div className={styles.line} />
      </div>
      <div className={styles.content}>
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
              name="Продолжить с Google"
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
              onChange={setEmail}
              type="email"
            />
            <Input
              className={styles.inputField}
              title="Пароль"
              placeholder="Придумайте надежный пароль"
              value={password}
              onChange={setPassword}
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
            handleClick={() => {}}
            styleButton={styles.loginButton}
            aria-label="Продолжить"
          />
        </form>
        <div className={styles.onboarding}>
          <LightBulb />
          <h2>Добро пожаловать в SkillSwap!</h2>
          <p>Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми</p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
