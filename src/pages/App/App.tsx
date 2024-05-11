/* eslint-disable max-len */
import './App.css';
import Loader from 'components/Loader/Loader';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import RestrictedRoute from 'components/RestrictedRoute/RestrictedRoute';
import SharedLayout from 'components/SharedLayout/SharedLayout';
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFound'));
const SignInPage = lazy(() => import('pages/SignInPage/SignIn'));
const SignUpPage = lazy(() => import('pages/SignUpPage/SignUp'));
const MainPage = lazy(() => import('pages/MainPage/Main'));

function App() {
  const isRefreshing = false;

  return (
    <div>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<PrivateRoute redirectTo="/signin" component={<MainPage />} />} />

            <Route path="/signup" element={<RestrictedRoute redirectTo="/main" component={<SignUpPage />} />} />

            <Route path="/signin" element={<RestrictedRoute redirectTo="/main" component={<SignInPage />} />} />

            <Route path="/main" element={<PrivateRoute redirectTo="/signin" component={<MainPage />} />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
