import { Customer } from '@commercetools/platform-sdk';
import { Dispatch } from '@reduxjs/toolkit';
import IUser from 'pages/App/types/interfaces/IUser';

import { setCredentials } from 'shared/api/authApi/store/authSlice';
import { ApiBuilder } from 'shared/libs/commercetools/apiBuilder';
import { tokenCache } from 'shared/libs/commercetools/tokenCache';

import { toastError } from 'shared/utils/notifications';

export default async function signInStoreLogic(
  email: string,
  password: string,
  dispatch: Dispatch,
) {
  let resp;
  try {
    resp = await new ApiBuilder().loginUser(email, password);

    // const tokensObject = tokenCache.get();
    if (resp?.statusCode === 200) {
      const customer: Customer = resp?.body.customer;
      const isStringProps = typeof customer.firstName === 'string'
        && typeof customer.lastName === 'string';

      if (isStringProps) {
        const user: IUser = {
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
        };

        dispatch(setCredentials({ token: tokenCache.get().token, user }));
      }
    }

    // TODO: access to tokens
  } catch (error) {
    if (error instanceof Error) {
      toastError(error.message);
    }
  }
}