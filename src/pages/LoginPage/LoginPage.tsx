import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/lib/constants/routes';
import ButtonDefault from '@shared/ui/ButtonDefault';
import HeaderAuth from '@features/auth/HeaderAuth/HeaderAuth';
import { Input } from '@shared/ui/useInput';
import { useState } from 'react';
import Google from '@/shared/assets/images/IconsSvg/Google';
import Apple from '@/shared/assets/images/IconsSvg/Apple';
import Eye from '@/shared/assets/images/IconsSvg/Eye';
import LightBulb from '@/shared/assets/images/IllustrationsSvg/LightBulb';
import styles from './LoginPage.module.css';
import { useDispatch } from '@/store/store';
import { getUserInfoData } from '@/store/slices/authSlice/authSlice';

function LoginPage() {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickEye = () => {
    setShowPass(!showPass);
  };

  const handleSubmit = async () => {
    await dispatch(getUserInfoData({ email, password })).unwrap();
    navigate('/profile');
  };

  const changeEmail = (value: string) => {
    setEmail(value);
  };

  const changePassword = (value: string) => {
    setPassword(value);
  };

  return (
    <div className={styles.container}>
      <HeaderAuth />
      <h2 className={styles.title}>Вход</h2>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formButtonsLogin}>
            <button className={styles.socialButton} onClick={() => {}} type="button">
              <Google />
              <span className={styles.socialText}>Продолжить с Google</span>
            </button>
            <button className={styles.socialButton} onClick={() => {}} type="button">
              <Apple />
              <span className={styles.socialText}>Продолжить с Apple</span>
            </button>
          </div>
          <p className={styles.formText}>или</p>
          <div className={styles.formInput}>
            <Input
              title="Email"
              placeholder="Введите email"
              value={email}
              onChange={changeEmail}
              type="email"
            />
            <div className={styles.inputWrapper}>
              <Input
                title="Пароль"
                placeholder="Введите ваш пароль"
                value={password}
                onChange={changePassword}
                type={showPass ? 'text' : 'password'}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={handleClickEye}
                aria-label="Показать пароль"
              >
                <Eye />
              </button>
            </div>
          </div>
          <div className={styles.formButtonSubmit}>
            <ButtonDefault
              name="Войти"
              handleClick={handleSubmit}
              styleButton={styles.loginButton}
              type="button"
            />
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
