import { NavLink } from 'react-router-dom';
import Logotype from '@shared/ui/Logotype/Logotype';
import AboutProject from '@/shared/ui/AllButtons/AboutProject/AboutProject';
import ButtonAllSkills from '@/shared/ui/AllButtons/ButtonAllSkills/ButtonAllSkills';
import InputSearch from '@/shared/ui/AllButtons/InputSearch/InputSearch';
import ChevronDown from '@/shared/assets/images/IconsSvg/ChevronDown';
import styles from './header.module.css';
import UserMenu from '../userMenu/userMenu';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <NavLink to="/" className={styles.logoContainer} aria-label="SkillSwap - Главная страница">
          <Logotype />
        </NavLink>
        <div className={styles.navigation}>
          <AboutProject />
          <ButtonAllSkills
            onClick={() => {}}
            className=""
            text="Все навыки"
            icon={<ChevronDown />}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <InputSearch />
        <UserMenu />
      </div>
    </header>
  );
}
