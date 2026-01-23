import { NavLink } from 'react-router-dom';
import { ROUTES } from '@shared/lib/constants/routes';
import Logotype from '@shared/ui/Logotype/Logotype';
import ButtonDefault from '@shared/ui/ButtonDefault/ButtonDefault';
import AboutProject from '@/shared/ui/AllButtons/AboutProject/AboutProject';
import ButtonAllSkills from '@/shared/ui/AllButtons/ButtonAllSkills/ButtonAllSkills';
import InputSearch from '@/shared/ui/AllButtons/InputSearch/InputSearch';
import ThemeToggle from '@/features/themeToggle/ThemeToggle';
import ChevronDown from '@/shared/assets/images/IconsSvg/ChevronDown';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <NavLink to="/" className={styles.logoContainer} aria-label="SkillSwap - Главная страница">
          <Logotype />
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
