import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@layouts/layout';
import { ROUTES } from '@shared/lib/constants/routes';
import { HomePage } from '../pages/HomePage/HomePage';
import RegistrationStep3 from '../features/auth/registration/ui/RegistrationStep3/RegistrationStep3';

export default function AppRoute() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path="/step3" element={<RegistrationStep3 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
