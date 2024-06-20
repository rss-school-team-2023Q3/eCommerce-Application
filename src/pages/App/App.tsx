import './App.css';
import { ThemeProvider } from '@mui/material';
import SharedLayout from 'pages/App/layouts/SharedLayout/SharedLayout';
import PrivateRoute from 'pages/App/routes/PrivateRoute/PrivateRoute';
import RestrictedRoute from 'pages/App/routes/RestrictedRoute/RestrictedRoute';
import CatalogPage from 'pages/CatalogPage/CatalogPage';
import React, { lazy, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';
import THEME from 'shared/theme/theme';
import fetchDataApp from 'shared/utils/fetchDataApp';
import Loader from 'widgets/Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';

const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFound'));
const SignInPage = lazy(() => import('pages/SignInPage/SignIn'));
const Profile = lazy(() => import('pages/ProfilePage/Profile'));
const SignUp = lazy(() => import('pages/SignUpPage/SignUp'));
const MainPage = lazy(() => import('pages/MainPage/Main'));
const ProductPage = lazy(() => import('pages/ProductPage/ProductPage'));
const BasketPage = lazy(() => import('pages/BasketPage/BasketPage'));
const AboutUsPage = lazy(() => import('pages/AboutUsPage/AboutUsPage'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = false;
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    fetchDataApp(dispatch);
    const lsTheme = localStorage.getItem('theme');

    setIsChecked(lsTheme === 'dark');
  }, []);

  const onTheme = (event: React.SyntheticEvent, checked: boolean) => {
    if (event?.target instanceof HTMLInputElement) {
      setIsChecked(checked);
      localStorage.setItem('theme', event.target.checked ? 'dark' : 'light');
    }
  };

  return (
    <div>
      <ThemeProvider theme={isChecked ? THEME.darkTheme : THEME.lightTheme}>
        {isRefreshing ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<SharedLayout onTheme={onTheme} />}>
              <Route index element={<MainPage />} />

              <Route path="/main" element={<MainPage />} />

              <Route
                path="/signup"
                element={(
                  <RestrictedRoute
                    redirectTo="/main"
                    component={<SignUp client={currentClient} />}
                  />
                )}
              />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/basket" element={<BasketPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />

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
              <Route path="/product/:id" element={<ProductPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        )}
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;
