export interface IFormAddress {
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

export type SelectedAddressKeys =
  | 'streetName'
  | 'postalCode'
  | 'city'
  | 'country';

export type ValidatedAddress = {
  [K in SelectedAddressKeys]: {
    isValid: boolean;
    value: IFormAddress[K];
  };
};

interface IMapAddresses {
  id: string;
  value: ValidatedAddress;
}

export default IMapAddresses;
