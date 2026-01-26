import { NavLink } from 'react-router-dom';
import styles from './HeaderRegister.module.css';
import Logotype from '@/shared/ui/Logotype';

type HeaderRegisterProps = {
  currentStep: 0 | 1 | 2 | 3;
};

function HeaderRegister({ currentStep }: HeaderRegisterProps) {
  const isLogin = currentStep === 0;
  const isStep = currentStep > 0;

  return (
    <header className={styles.header}>
      <NavLink aria-label="Логотип" to="/">
        <Logotype />
      </NavLink>

      <div className={styles.center}>
        {isLogin && <h2 className={styles.title}>Вход</h2>}

        {isStep && (
          <div className={styles.progress}>
            <h2 className={styles.title}>Шаг {currentStep} из 3</h2>

            <div className={styles.progressBar}>
              <span className={`${styles.line} ${currentStep >= 1 ? styles.active : ''}`} />
              <span className={`${styles.line} ${currentStep >= 2 ? styles.active : ''}`} />
              <span className={`${styles.line} ${currentStep >= 3 ? styles.active : ''}`} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default HeaderRegister;
