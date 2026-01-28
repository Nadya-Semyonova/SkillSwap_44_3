import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@layouts/layout';
import { ROUTES } from '@shared/lib/constants/routes';
import { HomePage } from '@pages/HomePage/HomePage';
import LoginPage from '@pages/LoginPage/LoginPage';
import RegisterPage from '@pages/RegistersPages/RegisterPage';

import { lazy, Suspense } from 'react';
import { LAZY } from '@shared/lib/constants/lazyApp';
import { TestPage } from '@pages/TestPage/TestPage';

const ProfilePage = lazy(() => import('@pages/ProfilePage/ProfilePage'));
const SelectedUserPage = lazy(() => import('@pages/SelectedUserPage/SelectedUserPage'));
const ErrorPage = lazy(() => import('@pages/ErrorPage/ErrorPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage'));

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

          <Route
            path={ROUTES.ERROR}
            element={
              <Suspense fallback={<div>{LAZY.PAGE}</div>}>
                <ErrorPage />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.NOTFOUND}
            element={
              <Suspense fallback={<div>{LAZY.PAGE}</div>}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>

        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

        <Route path={ROUTES.PAGE} element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}
