import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/lib/constants/routes';
import ButtonDefault from '@shared/ui/ButtonDefault';
import Google from '@img/IconsSvg/Google';
import Apple from '@img/IconsSvg/Apple';
import Eye from '@img/IconsSvg/Eye';
import LightBulb from '@img/IllustrationsSvg/LightBulb';
import HeaderAuth from '@features/auth/HeaderAuth/HeaderAuth';
import { Input } from '@shared/ui/useInput';
import styles from './LoginPage.module.css';
import { useLoginPage } from './libs/useLoginPage';

function LoginPage() {
  const { formData, errors, showPass, texts, handleChange, handleSubmit, handleClickEye } =
    useLoginPage();

  return (
    <div className={styles.container}>
      <HeaderAuth />
      <h2 className={styles.title}>{texts.title}</h2>
      <div className={styles.content}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className={styles.formButtonsLogin}>
            <button className={styles.socialButton} onClick={() => {}} type="button">
              <Google />
              <span className={styles.socialText}>{texts.socialGoogle}</span>
            </button>
            <button className={styles.socialButton} onClick={() => {}} type="button">
              <Apple />
              <span className={styles.socialText}>{texts.socialApple}</span>
            </button>
          </div>
          <p className={styles.formText}>или</p>
          <div className={styles.formInput}>
            <div className={styles.inputContainer}>
              <Input
                title={texts.emailTitle}
                placeholder={texts.emailPlaceholder}
                value={formData.email}
                onChange={(value) => handleChange('email', value)}
                type="email"
              />
              {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputWrapper}>
                <Input
                  title={texts.passwordTitle}
                  placeholder={texts.passwordPlaceholder}
                  value={formData.password}
                  onChange={(value) => handleChange('password', value)}
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
              {errors.password && <div className={styles.errorMessage}>{errors.password}</div>}
            </div>
            {errors.credentials && <div className={styles.errorMessage}>{errors.credentials}</div>}
          </div>
          <div className={styles.formButtonSubmit}>
            <ButtonDefault
              name={texts.loginButton}
              handleClick={handleSubmit}
              styleButton={styles.loginButton}
              type="button"
            />
            <Link to={ROUTES.REGISTER} className={styles.registerLink}>
              {texts.registerLink}
            </Link>
          </div>
        </form>
        <div className={styles.onboarding}>
          <div className={styles.iconWrapper}>
            <LightBulb />
          </div>
          <div className={styles.onboardingContent}>
            <h2 className={styles.onboardingTitle}>{texts.onboardingTitle}</h2>
            <p className={styles.onboardingText}>{texts.onboardingText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
