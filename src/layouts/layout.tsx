import { Outlet } from 'react-router-dom';
import Header from '@features/header/header';
import { Footer } from '../widgets/Footer/index';

export function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
