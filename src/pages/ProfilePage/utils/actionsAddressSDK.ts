import { Address } from '@commercetools/platform-sdk';
import { Dispatch } from '@reduxjs/toolkit';
import FormField from 'pages/App/types/enums/formField';
import IMapAddresses from 'pages/App/types/interfaces/IValidateAddress';
import { IFormContextType } from 'pages/SignUpPage/formContext';
import { setCredentials } from 'shared/api/authApi/store/authSlice';
import { currentClient } from 'shared/libs/commercetools/apiBuilder';
import capitalizeFirstLetter from 'shared/utils/capitalizeFirstLetter';
import { toastSuccess } from 'shared/utils/notifications';

import selectCountryCode from 'shared/utils/selectCountryCode';

export default async function actionsAddressAddSDK(
  formData: IFormContextType,
  type: 'billing' | 'shipping',
  id: string,
  vers: number,
  dispatch: Dispatch
) {
  // const version = vers;
  const idAddress = `new${capitalizeFirstLetter(type)}Address`;
  const formAddress = formData.addresses;

  // if (!formAddress) throw new Error("formData.addresses doesn't exist");

  const addressMap: IMapAddresses | undefined = formAddress?.find(
    (el) => el.id === idAddress
  );

  if (!addressMap) {
    return null;
  }

  const address: Address = Object.entries(addressMap.value).reduce(
    (acc, entry) => {
      const [key, value] = entry;
      const val =
        key === FormField.country
          ? selectCountryCode(value.value)
          : value.value;
      const prop = { [key]: val };

      return { ...acc, ...prop };
    },
    {}
  ) as Address;

  const resp = await currentClient.addNewAddress(id, vers, address);

  if (resp?.statusCode === 200) {
    const { addresses } = resp.body;
    const addedAddressId = addresses.find(
      ({ streetName, postalCode, city }) =>
        address.streetName === streetName &&
        address.postalCode === postalCode &&
        address.city === city
    )?.id;

    if (!addedAddressId) return null;

    const newVersion = resp.body.version;
    const response = await currentClient.setShippingOrBillingAddress(
      id,
      addedAddressId,
      newVersion,
      type
    );

    if (response?.statusCode === 200) {
      dispatch(setCredentials({ user: response.body }));
      addressMap.id = addedAddressId;
      toastSuccess(`new ${type} address created`);

      return response;
    }
  }

  return null;
}
