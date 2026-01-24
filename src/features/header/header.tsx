import { NavLink } from 'react-router-dom';
import Logotype from '@shared/ui/Logotype/Logotype';
import { useEffect, useRef, useState } from 'react';
import AboutProject from '@/shared/ui/AllButtons/AboutProject/AboutProject';
import ButtonAllSkills from '@/shared/ui/AllButtons/ButtonAllSkills/ButtonAllSkills';
import InputSearch from '@/shared/ui/AllButtons/InputSearch/InputSearch';
import ChevronDown from '@/shared/assets/images/IconsSvg/ChevronDown';
import styles from './header.module.css';
import UserMenu from '../userMenu/userMenu';

export default function Header() {
  const [isSkillsSelectorOpen, setIsSkillsSelectorOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // const toggleButtonAllSkills = () => {
  //   setIsSkillsSelectorOpen((prevState) => !prevState);
  // };
  const closeSkillsSelector = () => {
    setIsSkillsSelectorOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeSkillsSelector();
      }
    };
    if (isSkillsSelectorOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSkillsSelectorOpen]);

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
