import { Outlet } from 'react-router-dom';
import { Footer } from '../widgets/Footer/index';
// eslint-disable-next-line import/extensions
import Header from '@/features/header/header';

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
