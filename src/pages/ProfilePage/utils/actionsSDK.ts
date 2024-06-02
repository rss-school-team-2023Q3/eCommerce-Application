import { Customer } from '@commercetools/platform-sdk';
import { Dispatch } from '@reduxjs/toolkit';
import IDataAction, { Keys } from 'pages/App/types/interfaces/IDataAction';
import { IFormContextType, IValidValue } from 'pages/SignUpPage/formContext';
import { setCredentials } from 'shared/api/authApi/store/authSlice';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';
import capitalizeFirstLetter from 'shared/utils/capitalizeFirstLetter';
import { toastSuccess } from 'shared/utils/notifications';

export default async function actionsSDK(
  formData: IFormContextType,
  id: string,
  vers: number,
  dispatch: Dispatch,
) {
  let version = vers;

  if (!formData.fieldChangedSet?.size) return null;

  const arr = Array.from(formData.fieldChangedSet) as Keys[];

  const updateActions = arr.reduce((acc, key) => {
    let nameAction = `set${capitalizeFirstLetter(key as string)}`;

    let fakeEl = key;

    if (
      key === 'defaultShippingAddressId'
      || key === 'defaultBillingAddressId'
      || key === 'password'
    ) return acc;

    if ((key as string) === 'firstName') fakeEl = 'name';

    if ((key as string) === 'email') nameAction = 'changeEmail';

    if ((key as string) === 'dateOfBirth') {
      return [
        ...acc,
        { action: nameAction, [key]: formData.date.value.format('YYYY-MM-DD') },
      ];
    }

    const data = formData[fakeEl as Keys] as IValidValue;

    return [...acc, { action: nameAction, [key]: data.value }];
  }, [] as IDataAction[]);

  let res = await currentClient.updateUserData(updateActions, id, version);

  if (res?.statusCode === 200) {
    toastSuccess('User data updated');
    const newCustomer: Customer = res?.body;

    version = newCustomer.version;

    dispatch(setCredentials({ user: newCustomer }));
  }

  if (!arr.includes('password')) return res;

  if (!formData.oldPassword) return res;

  res = await currentClient.updatePassword({
    version,
    currentPassword: formData.oldPassword,
    newPassword: formData.password.value,
  });

  if (res?.statusCode === 200) {
    toastSuccess('User password updated');

    const loginResponse = await currentClient.loginUser(
      formData.email.value,
      formData.password.value,
    );

    if (loginResponse?.statusCode === 200) {
      dispatch(setCredentials({ user: loginResponse.body.customer }));
    }
  }

  return res;
}
