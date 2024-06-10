import { Dispatch } from '@reduxjs/toolkit';
import { logout } from 'shared/api/authApi/store/authSlice';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';
import { tokenCache } from 'shared/libs/commercetools/tokenCache';

export default async function logoutUser(dispatch: Dispatch) {
  dispatch(logout());
  tokenCache.clear();

  await currentClient.createAnonymousClient();
  await currentClient.getProducts('', 'masterData.current.name.en asc');
  currentClient.createCart().then((resp) => {
    localStorage.setItem('cartId', resp?.body.id as string);
  });
}
