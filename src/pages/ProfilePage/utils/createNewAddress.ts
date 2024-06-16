import { Address } from '@commercetools/platform-sdk';
import IMapAddresses from 'pages/App/types/interfaces/IValidateAddress';

export default function createNewAddress(
  id: string,
  addresses: IMapAddresses[],
): Address {
  const newFormAddress: IMapAddresses = {
    id,
    value: {
      streetName: {
        value: '',
        isValid: false,
      },
      city: {
        value: '',
        isValid: false,
      },
      postalCode: {
        value: '',
        isValid: false,
      },
      country: {
        value: '',
        isValid: false,
      },
    },
  };

  if (!addresses.find((el) => el.id === id)) addresses.push(newFormAddress);

  return {
    id,
    streetName: '',
    postalCode: '',
    country: '',
    city: '',
  };
}
