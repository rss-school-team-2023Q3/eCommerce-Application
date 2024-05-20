import { Customer } from '@commercetools/platform-sdk';
import { Dispatch } from '@reduxjs/toolkit';
import IUser from 'pages/App/types/interfaces/IUser';

import { setCredentials } from 'shared/api/authApi/store/authSlice';
import { ApiBuilder } from 'shared/libs/commercetools/apiBuilder';

import { toastError } from 'shared/utils/notifications';

export default async function signInStoreLogic(
  email: string,
  password: string,
  dispatch: Dispatch,
) {
  let resp;
  try {
    resp = await new ApiBuilder().loginUser(email, password);

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

        dispatch(setCredentials({ user }));
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      toastError(error.message);
    }
  }
}
