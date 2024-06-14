import { Customer } from '@commercetools/platform-sdk';
import { Dispatch } from '@reduxjs/toolkit';
import { setCredentials } from 'shared/api/authApi/store/authSlice';
import { setCart } from 'shared/api/cartApi/cartSlice';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';

import getCurrentCart from './getCurrentCart.ts';

const fetchDataApp = async (dispatch: Dispatch) => {
  if (localStorage.getItem('tokenCacheGG')) {
    const body: Customer | null = await currentClient.createRefreshTokenClient();

    if (body) {
      dispatch(setCredentials({ user: body }));
    }
  } else {
    await currentClient.createAnonymousClient();
  }

  const cartsRes = await currentClient.getCarts();

  if (!cartsRes) {
    currentClient.createCart().then((resp) => {
      localStorage.setItem('cartId', resp?.body.id as string);

      if (resp?.statusCode === 201) {
        dispatch(setCart({ cart: resp.body }));
      }
    });
  } else {
    const response = await getCurrentCart(
      !!localStorage.getItem('tokenCacheGG'),
    );

    if (response?.statusCode === 200) {
      dispatch(setCart({ cart: response.body }));
    }
  }
};

export default fetchDataApp;
