import { Dispatch } from '@reduxjs/toolkit';
import { logout } from 'shared/api/authApi/store/authSlice';
import { ApiBuilder } from 'shared/libs/commercetools/apiBuilder';
import { tokenCache } from 'shared/libs/commercetools/tokenCache';

export default async function logoutUser(dispatch: Dispatch) {
  dispatch(logout());
  tokenCache.clear();
  const currentClient = new ApiBuilder();

  await currentClient.createAnonymousClient();
  await currentClient.getProducts();
}
