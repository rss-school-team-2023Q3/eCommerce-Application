import './App.css';
import SharedLayout from 'pages/App/layouts/SharedLayout/SharedLayout';
import PrivateRoute from 'pages/App/routes/PrivateRoute/PrivateRoute';
import RestrictedRoute from 'pages/App/routes/RestrictedRoute/RestrictedRoute';
import IUser from 'pages/App/types/interfaces/IUser';
import CatalogPage from 'pages/CatalogPage/CatalogPage';
import Profile from 'pages/ProfilePage/Profile';
import { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { setCredentials } from 'shared/api/authApi/store/authSlice';
import { ApiBuilder } from 'shared/libs/commercetools/apiBuilder';
import Loader from 'widgets/Loader/Loader';

import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './routes/PrivateRoute/PrivateRoute.tsx';

const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFound'));
const SignInPage = lazy(() => import('pages/SignInPage/SignIn'));
const SignUpPage = lazy(() => import('pages/SignUpPage/SignUp'));
const MainPage = lazy(() => import('pages/MainPage/Main'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = false;
  const currentClient = new ApiBuilder();

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('tokenCacheGG')) {
        const body = await currentClient.createRefreshTokenClient();

        if (body) {
          const { email, firstName, lastName } = body;

          if (
            typeof email === 'string'
            && typeof firstName === 'string'
            && typeof lastName === 'string'
          ) {
            const user: IUser = { email, firstName, lastName };

            dispatch(setCredentials({ user }));
          }
        }
      } else {
        await currentClient.createAnonymousClient();
      }

      // await currentClient.getProducts();
    };

    fetchData();
  }, []);

  return (
    <div>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<MainPage />} />

            <Route path="/main" element={<MainPage />} />

            <Route
              path="/signup"
              element={(
                <RestrictedRoute
                  redirectTo="/main"
                  component={<SignUpPage client={currentClient} />}
                />
              )}
            />
            <Route
              path="/catalog"
              element={(
                <PrivateRoute
                  redirectTo="/catalog"
                  component={<CatalogPage client={currentClient} />}
                />
              )}
            />

            <Route
              path="/signin"
              element={(
                <RestrictedRoute
                  redirectTo="/main"
                  component={<SignInPage />}
                />
              )}
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute redirectTo="/signin" component={<Profile />} />
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
