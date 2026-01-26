import { NavLink } from 'react-router-dom';
import Logotype from '@shared/ui/Logotype/Logotype';
import { useEffect, useRef, useState } from 'react';
import AboutProject from '@/shared/ui/AllButtons/AboutProject/AboutProject';
import ButtonAllSkills from '@/shared/ui/AllButtons/ButtonAllSkills/ButtonAllSkills';
import InputSearch from '@/features/InputSearch/InputSearch';
import ChevronDown from '@/shared/assets/images/IconsSvg/ChevronDown';
import styles from './header.module.css';
import UserMenu from '../userMenu/userMenu';
import SkillsSelector from '@/widgets/SkillsSelector/SkillsSelector';
import SearchModal from '@/features/InputSearch//searchModal/SearchModal';
import useInputSearchLogic from '@/features/InputSearch/searchModal/SearchLogic';

export default function Header() {
  const [isSkillsSelectorOpen, setIsSkillsSelectorOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLDivElement>(null);

  const { searchQuery, setSearchQuery, filteredUsers, clearSearchQuery } = useInputSearchLogic();

  const toggleButtonAllSkills = () => {
    setIsSkillsSelectorOpen((prevState) => !prevState);
  };
  const closeSkillsSelector = () => {
    setIsSkillsSelectorOpen(false);
  };
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    // Открываем модальное окно, если введен любой текст (даже если нет результатов)
    if (value.trim() !== '') {
      setIsSearchModalOpen(true);
    } else {
      setIsSearchModalOpen(false);
    }
  };

  const handleSearchFocus = () => {
    // Открываем модальное окно только если есть текст в поиске
    if (searchQuery.trim() !== '') {
      setIsSearchModalOpen(true);
    }
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
    clearSearchQuery(); // Очищаем поисковый запрос при закрытии модального окна
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
        <AboutProject />
        <div className={styles.navigation} ref={buttonRef}>
          <ButtonAllSkills
            onClick={toggleButtonAllSkills}
            className=""
            text="Все навыки"
            icon={<ChevronDown />}
          />
        </div>
        <div
          ref={modalRef}
          className={`${styles.modalContainer} ${isSkillsSelectorOpen ? styles.open : ''}`}
        >
          <SkillsSelector />
        </div>
      </div>

      <div className={styles.rightSection} ref={searchInputRef}>
        <InputSearch
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
        />
        <UserMenu />
        <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} users={filteredUsers} />
      </div>
    </header>
  );
}
