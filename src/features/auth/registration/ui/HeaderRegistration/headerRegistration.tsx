import { useNavigate } from 'react-router-dom';
import Logo from '@public/img/LogoSvg/Logo';
import Cross from '@public/img/iconsSvg/Cross';
import ButtonDefault from '@shared/ui/ButtonDefault';
import { ROUTES } from '@/shared/lib/constants/routes';
import styles from './headerRegistration.module.css';

function HeaderRegister() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Logo />
        <span className={styles.brandName}>SkillSwap</span>
      </div>
      <div className={styles.buttonWrapperClose}>
        <ButtonDefault
          name="Закрыть"
          handleClick={() => navigate(ROUTES.HOME)}
          styleButton={styles.closeButton}
        />
        <div className={styles.iconCloseWrapper}>
          <Cross />
        </div>
      </div>
    </header>
  );
}

export default HeaderRegister;
