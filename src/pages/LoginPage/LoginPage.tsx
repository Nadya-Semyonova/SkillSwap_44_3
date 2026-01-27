import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/lib/constants/routes';
import ButtonDefault from '@shared/ui/ButtonDefault';
import Apple from '@shared/assets/images/IconsSvg/Apple';
import Eye from '@shared/assets/images/IconsSvg/Eye';
import LightBulb from '@shared/assets/images/IllustrationsSvg/LightBulb';
import { Input } from '@shared/ui/useInput';
import HeaderAuth from '@/pages/RegistersPages/HeaderRegister/HeaderRegister';
import Google from '@/shared/assets/images/IconsSvg/Google';
import styles from './LoginPage.module.css';
import { useLoginPage } from './libs/useLoginPage';

function LoginPage() {
  const {
    formData,
    errors,
    showPass,
    hasError,
    texts,
    handleChange,
    handleSubmit,
    handleClickEye,
  } = useLoginPage();

  return (
    <div className={styles.container}>
      <HeaderAuth/>
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
          <div className={`${styles.formInput} ${hasError ? styles.formInputError : ''}`}>
            <div className={styles.inputContainer}>
              <Input
                title={texts.emailTitle}
                placeholder={texts.emailPlaceholder}
                value={formData.email}
                onChange={(value) => handleChange('email', value)}
                type="email"
                className={errors.email ? styles.inputError : ''}
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
                  className={errors.password ? styles.inputError : ''}
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
