import style from './HomePage.module.css';
import Filters from '../../widgets/Filters';

export function HomePage() {
  return (
    <div>
      <h1 className={style.pageTitle}>skillswap</h1>
      <Filters />
    </div>
  );
}
