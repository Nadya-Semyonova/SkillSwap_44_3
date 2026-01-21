import { Outlet } from 'react-router-dom';
import styles from './layout.module.css';
import Header from '@/features/header/header';
import { Footer } from '../widgets/Footer/index';

export function Layout() {
  return (
    <>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
