import { Customer } from '@commercetools/platform-sdk';
import { Dispatch } from '@reduxjs/toolkit';

import { setCredentials } from 'shared/api/authApi/store/authSlice';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';

import { toastError } from 'shared/utils/notifications';

export default async function signInStoreLogic(
  email: string,
  password: string,
  dispatch: Dispatch
) {
  let resp;
  try {
    resp = await currentClient.loginUser(email, password);

    if (resp?.statusCode === 200) {
      const customer: Customer = resp?.body.customer;
      const isStringProps =
        typeof customer.firstName === 'string' &&
        typeof customer.lastName === 'string';

      if (isStringProps) {
        // const user: IUser = {
        //   email: customer.email,
        //   firstName: customer.firstName,
        //   lastName: customer.lastName,
        //   country: customer.addresses[1]
        //     ? customer.addresses[1].country
        //     : customer.addresses[0].country,
        // };
        // dispatch(setCredentials({ user }));
      }

      dispatch(setCredentials({ user: customer }));
    }
  } catch (error) {
    if (error instanceof Error) {
      toastError(error.message);
    }
  }
}
