import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@layouts/layout';
import { ROUTES } from '@shared/lib/constants/routes';
import { HomePage } from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import { TestPage } from '../pages/TestPage/TestPage';

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
          <Route path={ROUTES.ERROR} element={<ErrorPage />} />
          <Route path={ROUTES.NOTFOUND} element={<NotFoundPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Route>
        <Route path={ROUTES.PAGE} element={<TestPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
