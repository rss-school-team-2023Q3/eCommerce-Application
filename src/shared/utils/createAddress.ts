import selectCountryCode from 'shared/utils/selectCountryCode';

interface IAddressData {
  [key: string]: {
    value: string;
  };
}

export const createAddress = (addressData: IAddressData, type: string) => ({
  country: selectCountryCode(addressData[`${type}Country`].value),
  city: addressData[`${type}City`].value,
  postalCode: addressData[`${type}Code`].value,
  streetName: addressData[`${type}Street`].value,
});
