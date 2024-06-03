import { Address } from '@commercetools/platform-sdk';

export default function createNewAddress(id: string): Address {
  return {
    id,
    streetName: '',
    postalCode: '',
    country: '',
    city: '',
  };
}
