import './App.css';
import { Customer } from '@commercetools/platform-sdk';
import SharedLayout from 'pages/App/layouts/SharedLayout/SharedLayout';
import PrivateRoute from 'pages/App/routes/PrivateRoute/PrivateRoute';
import RestrictedRoute from 'pages/App/routes/RestrictedRoute/RestrictedRoute';
import CatalogPage from 'pages/CatalogPage/CatalogPage';
import { lazy, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { setCredentials } from 'shared/api/authApi/store/authSlice';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';
import Loader from 'widgets/Loader/Loader';

import 'react-toastify/dist/ReactToastify.css';

const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFound'));
const SignInPage = lazy(() => import('pages/SignInPage/SignIn'));
const Profile = lazy(() => import('pages/ProfilePage/Profile'));
const SignUp = lazy(() => import('pages/SignUpPage/SignUp'));
const MainPage = lazy(() => import('pages/MainPage/Main'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = false;
  const currentClient = ApiBuilder.client;
  const productsList: IProductData[] = [];
  const discountsList: ProductDiscount[] = [];
  const [products, setProducts] = useState(productsList);
  const [discounts, setDiscounts] = useState(discountsList);

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('tokenCacheGG')) {
        const body: Customer | null = await currentClient.createRefreshTokenClient();

        if (body) {
          // const { email, firstName, lastName } = body;

          // if (
          //   typeof email === 'string'
          //   && typeof firstName === 'string'
          //   && typeof lastName === 'string'
          // ) {
          //   const user: IUser = {
          //     email,
          //     firstName,
          //     lastName,
          //     country: body.addresses[1]
          //       ? body.addresses[1].country
          //       : body.addresses[0].country,
          //   };

          //   dispatch(setCredentials({ user }));
          // }

          dispatch(setCredentials({ user: body }));
        }
      } else {
        await currentClient.createAnonymousClient();
      }
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
                  component={<SignUp client={currentClient} />}
                />
              )}
            />
            <Route path="/catalog" element={<CatalogPage />} />

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
