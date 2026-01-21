import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/shared/lib/constants/routes';
import LogoIcon from '../../shared/ui/Logo/Logo';
import AboutProject from '../../shared/ui/AboutProject/AboutProject';
import ButtonAllSkills from '../../shared/ui/ButtonAllSkills/ButtonAllSkills';
import InputSearch from '../../shared/ui/InputSearch/InputSearch';
import ThemeToggle from '../ChangeOfTopic/UI/ThemeToggle';
import ButtonDefault from '../../shared/ui/ButtonDefault/ButtonDefault';
import styles from './header.module.css';
import ChevronDown from '../../../public/img/IconsSvg/ChevronDown';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <NavLink to="/" className={styles.logoContainer} aria-label="SkillSwap - Главная страница">
          <LogoIcon />
          SkillSwap
        </NavLink>

        <AboutProject />
        {/* здесь */}
        <ButtonAllSkills onClick={() => {}} className="" text="Все навыки" icon={<ChevronDown />} />
      </div>

      <div className={styles.rightSection}>
        <InputSearch />
        <ThemeToggle />

        <NavLink to={ROUTES.LOGIN} className={styles.navLink}>
          <ButtonDefault name="Войти" styleButton={styles.loginButton} />
        </NavLink>

        <NavLink to={ROUTES.REGISTER} className={styles.navLink}>
          <ButtonDefault name="Зарегистрироваться" styleButton={styles.registerButton} />
        </NavLink>
      </div>
    </header>
  );
}
