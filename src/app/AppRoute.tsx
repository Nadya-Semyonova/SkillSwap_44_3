import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../layouts/layout';
import { ROUTES } from '../shared/lib/constants/routes';
import { HomePage } from '../pages/HomePage/HomePage';

export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
