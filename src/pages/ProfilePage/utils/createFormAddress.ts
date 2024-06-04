import { Address } from '@commercetools/platform-sdk';
import IMapAddresses, {
  ValidatedAddress,
} from 'pages/App/types/interfaces/IValidateAddress';

export default function createFormAddress(addr: Address): IMapAddresses {
  const value: ValidatedAddress = {
    streetName: { value: addr.streetName as string, isValid: true },
    city: { value: addr.city as string, isValid: true },
    country: { value: addr.country as string, isValid: true },
    postalCode: { value: addr.postalCode as string, isValid: true },
  };

  return {
    id: addr.id as string,
    value,
  };
}
