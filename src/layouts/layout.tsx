import { Outlet } from 'react-router-dom';
import { Footer } from '../widgets/Footer/index';

export function Layout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
