import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@layouts/layout';
import { ROUTES } from '@shared/lib/constants/routes';
import { HomePage } from '@pages/HomePage/HomePage';

import { lazy, Suspense } from 'react';
import { LAZY } from '@shared/lib/constants/lazyApp';
import LoginPage from '@pages/LoginPage/LoginPage';
import RegisterPage from '@pages/RegistersPages/RegisterPage';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';
import { TestPage } from '@pages/TestPage/TestPage';
import SelectedUserPage from '@/pages/SelectedUserPage/SelectedUserPage';

const ProfilePage = lazy(() => import('@pages/ProfilePage/ProfilePage'));

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

          <Route
            path={ROUTES.PROFILE}
            element={
              <Suspense fallback={<div>{LAZY.PAGE}</div>}>
                <ProfilePage />
              </Suspense>
            }
          />

          <Route
            path={ROUTES.SELECTED}
            element={
              <Suspense fallback={<div>{LAZY.PAGE}</div>}>
                <SelectedUserPage />
              </Suspense>
            }
          />

          <Route path={ROUTES.ERROR} element={<ErrorPage />} />
          <Route path={ROUTES.NOTFOUND} element={<NotFoundPage />} />
        </Route>

        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.PAGE} element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}
