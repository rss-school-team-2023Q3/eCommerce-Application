import './App.css';
import SharedLayout from 'pages/App/layouts/SharedLayout/SharedLayout';
import RestrictedRoute from 'pages/App/routes/RestrictedRoute/RestrictedRoute';
import { lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ApiBuilder } from 'shared/libs/commercetools/apiBuilder';
import Loader from 'widgets/Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';

const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFound'));
const SignInPage = lazy(() => import('pages/SignInPage/SignIn'));
const SignUpPage = lazy(() => import('pages/SignUpPage/SignUp'));
const MainPage = lazy(() => import('pages/MainPage/Main'));

function App() {
  const isRefreshing = false;
  const currentClient = new ApiBuilder();

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('tokenCache')) {
        const savedtokenCache = localStorage.getItem('tokenCache')!;

        await currentClient.createRefreshTokenClient(savedtokenCache);
      } else {
        await currentClient.createAnonymousClient();
      }

      await currentClient.getProducts();
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
              path="/signin"
              element={(
                <RestrictedRoute
                  redirectTo="/main"
                  component={<SignInPage />}
                />
              )}
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
