import style from './HomePage.module.css';
import Filters from '../../widgets/Filters';
import LogoButton from '../../shared/ui/Logo/index';
import ButtonAllSkills from '../../shared/ui/ButtonAllSkills/index';
import AboutProject from '../../shared/ui/AboutProject/AboutProject';

export function HomePage() {
  return (
    <div>
      <h1 className={style.pageTitle}>skillswap</h1>
      <LogoButton />
      <AboutProject />
      <ButtonAllSkills />
      <Filters />
    </div>
  );
}
