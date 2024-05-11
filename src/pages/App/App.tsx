/* eslint-disable max-len */
import './App.css';
import Loader from 'components/Loader/Loader';
import SharedLayout from 'pages/App/layouts/SharedLayout/SharedLayout';
import PrivateRoute from 'pages/App/routes/PrivateRoute/PrivateRoute';
import RestrictedRoute from 'pages/App/routes/RestrictedRoute/RestrictedRoute';
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
