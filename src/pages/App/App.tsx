import './App.css';
import { Customer, ProductDiscount } from '@commercetools/platform-sdk';
import SharedLayout from 'pages/App/layouts/SharedLayout/SharedLayout';
import PrivateRoute from 'pages/App/routes/PrivateRoute/PrivateRoute';
import RestrictedRoute from 'pages/App/routes/RestrictedRoute/RestrictedRoute';
// import IUser from 'pages/App/types/interfaces/IUser';
import CatalogPage from 'pages/CatalogPage/CatalogPage';
import { lazy, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { setCredentials } from 'shared/api/authApi/store/authSlice';
import { ApiBuilder } from 'shared/libs/commercetools/apiBuilder';
import setProductsArray from 'shared/utils/setProductsArray.ts';
import Loader from 'widgets/Loader/Loader';

import 'react-toastify/dist/ReactToastify.css';

import IProductData from './types/interfaces/IProductData.ts';

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

      await currentClient
        .getProducts()
        .then((resp) => resp?.body.results)
        .then((resp) => setProducts(setProductsArray(resp)));

      await currentClient
        .getProductsDiscount()
        .then((resp) => resp?.body.results)
        .then((resp) => setDiscounts(resp as ProductDiscount[]));
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
            <Route
              path="/catalog"
              element={
                <CatalogPage products={products} discounts={discounts} />
              }
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
