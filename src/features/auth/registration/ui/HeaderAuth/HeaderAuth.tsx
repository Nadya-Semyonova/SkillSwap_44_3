import { NavLink } from 'react-router-dom';
import styles from './HeaderAuth.module.css';
import Logotype from '@/shared/ui/Logotype';

function HeaderAuth() {
  return (
    <header className={styles.header}>
      <NavLink aria-label="Логотип" to="/">
        <Logotype />
      </NavLink>
    </header>
  );
}

export default HeaderAuth;
