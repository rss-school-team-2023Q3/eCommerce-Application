import IDataAction, { Keys } from 'pages/App/types/interfaces/IDataAction';
import { IFormContextType, IValidValue } from 'pages/SignUpPage/formContext';
import { ApiBuilder } from 'shared/libs/commercetools/apiBuilder';
import capitalizeFirstLetter from 'shared/utils/capitalizeFirstLetter';

export default async function actionsSDK(
  formData: IFormContextType,
  id: string,
  version: number,
) {
  const arr = formData.fieldChangedSet?.size
    ? (Array.from(formData.fieldChangedSet) as Keys[])
    : [];

  const updateActions = arr.reduce((acc, key) => {
    let nameAction = `set${capitalizeFirstLetter(key as string)}`;

    let fakeEl = key;

    if (key === 'defaultShippingAddressId' || key === 'defaultBillingAddressId') return acc;

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

  return ApiBuilder.client.updateUserData(updateActions, id, version);
}
