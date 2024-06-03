import { Address } from '@commercetools/platform-sdk';
import IMapAddresses, {
  ValidatedAddress,
} from 'pages/App/types/interfaces/IValidateAddress';

export default function createFormAddress(addr: Address): IMapAddresses {
  const value: ValidatedAddress = {
    streetName: { value: addr.streetName as string, isValid: false },
    city: { value: addr.city as string, isValid: false },
    country: { value: addr.country as string, isValid: false },
    postalCode: { value: addr.postalCode as string, isValid: false },
  };

  return {
    id: addr.id as string,
    value,
  };
}
