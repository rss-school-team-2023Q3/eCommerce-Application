/* eslint-disable max-len */
import './App.css';
import Loader from 'components/Loader/Loader';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import RestrictedRoute from 'components/RestrictedRoute/RestrictedRoute';
import SharedLayout from 'components/SharedLayout/SharedLayout';
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const NotFoundPage = lazy(() => import('pages/NotFound/NotFound'));
const SignInPage = lazy(() => import('pages/SignIn/SignIn'));
const SignUpPage = lazy(() => import('pages/SignUp/SignUp'));
const MainPage = lazy(() => import('pages/Main/MainPage'));
const StartPage = lazy(() => import('pages/StartPage/StartPage'));

function App() {
  const isRefreshing = false;

  return (
    <section>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<RestrictedRoute redirectTo="/main" component={<StartPage />} />} />

            <Route path="/signup" element={<RestrictedRoute redirectTo="/main" component={<SignUpPage />} />} />

            <Route path="/signin" element={<RestrictedRoute redirectTo="/main" component={<SignInPage />} />} />

            <Route path="/main" element={<PrivateRoute redirectTo="/signin" component={<MainPage />} />} />

            <Route path="*" element={<PrivateRoute redirectTo="/signin" component={<NotFoundPage />} />} />
          </Route>
        </Routes>
      )}
    </section>
  );
}

export default App;
