import style from './HomePage.module.css';
import Filters from '../../widgets/Filters';
import LogoButton from '../../shared/ui/Logo/index';
import ButtonAllSkills from '../../shared/ui/ButtonAllSkills/index';
import AboutProject from '../../shared/ui/AboutProject/AboutProject';
import LoginButton from '../../shared/ui/login';
import RegisterButton from '../../shared/ui/register';
import ThemeToggle from '../../features/ChangeOfTopic/UI';
import InputSearch from '../../shared/ui/InputSearch';

export function HomePage() {
  return (
    <div>
      <h1 className={style.pageTitle}>skillswap</h1>
      <LogoButton />
      <AboutProject />
      <ButtonAllSkills />
      <InputSearch />
      <LoginButton />
      <RegisterButton />
      <ThemeToggle />
      <Filters />
    </div>
  );
}
