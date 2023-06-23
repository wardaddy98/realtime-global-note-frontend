import { lazy, Suspense } from 'react';
import { Outlet, RouteObject, useRoutes } from 'react-router-dom';
import Loader from '../components/Loader';
const Landing = lazy(() => import('../Pages/Landing'));
const Lobby = lazy(() => import('../Pages/Lobby'));
const MainLayout = lazy(() => import('../components/MainLayout'));
const NotFound = lazy(() => import('../components/NotFound'));
const ProtectedRoute = lazy(() => import('../routes/ProtectedRoute'));
const UnProtectedRoute = lazy(() => import('../routes/UnProtectedRoute'));
const AppRoutes = () => {
  const routes: RouteObject[] = [
    {
      path: '',
      element: (
        <Suspense
          fallback={<Loader style={{ marginTop: '20rem' }} loadingText='Almost there...' />}
        >
          <MainLayout>
            <Outlet />
          </MainLayout>
        </Suspense>
      ),

      children: [
        {
          path: '/',
          element: (
            <UnProtectedRoute>
              <Landing />
            </UnProtectedRoute>
          ),
        },
        {
          path: '/lobby',
          element: (
            <ProtectedRoute>
              <Lobby />
            </ProtectedRoute>
          ),
        },
      ],
    },

    {
      path: '*',
      element: <NotFound />,
    },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
