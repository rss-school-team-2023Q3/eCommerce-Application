import { Address, Customer } from '@commercetools/platform-sdk';
import { FormControlLabel, Radio } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/store.ts';
import 'pages/ProfilePage/Profile.modules.css';
import CityInputProfile from 'shared/components/profileComponents/CityIpnputProfile';

import CountryProfile from './CountryProfile.tsx';
import PostalCodeProfile from './PostalCodeProfile.tsx';
import StreetInputProfile from './StreetProfile.tsx';

// type DefaultType = 'defaultBillingAddressId' | 'defaultShippingAddressId'

export default function ProfileAddress({
  type,
  addressId,
  index,
  isDisable,
}: {
  type: string;
  addressId: string;
  index: number;
  isDisable: boolean;
}) {
  const customer: Customer | null = useSelector(
    (state: RootState) => state.auth.user
  );

  // const defaultType = `default${capitalizeFirstLetter(type)}AddressId` as DefaultType;

  // if (!customer) {
  // throw new Error('Error Profile Page');
  // }

  // const [isDefault, setIsDefault] = useState(customer[defaultType] === addressId);
  // formData[defaultType] = customer[defaultType];
  const address: Address | undefined = customer?.addresses.find(
    (addr) => addr.id === addressId
  );

  if (!address) throw new Error('Address dont find by id');

  const [isBillingCountryChange, setBillingCountryChange] = useState(
    !!customer?.defaultBillingAddressId
  );
  const [isShippingCountryChange, setShippingCountryChange] = useState(
    !!customer?.defaultShippingAddressId
  );
  // const isAddresses = !!(billingAddressIds && shippingAddressIds);
  // const [isSameAddress, setSameAddress] = useState(
  //   isAddresses && billingAddressIds[0] === shippingAddressIds[0],
  // );

  // const [isDefaut, setDefault] = useState(
  //   customer?.defaultShippingAddressId === addressId || customer?.defaultBillingAddressId === addressId,
  // );
  // useEffect(() => {
  //   setIsDefault(formData[defaultType] === addressId);
  //   console.log(isDefault);
  // }, [formData[defaultType]]);

  const updateCountry = () => {
    switch (type) {
      case 'shipping': {
        setShippingCountryChange(!isShippingCountryChange);
        break;
      }
      case 'billing': {
        setBillingCountryChange(!isBillingCountryChange);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <div className="data-field-input">
      <p>{`${index + 1} Address`}</p>
      <FormControlLabel
        control={
          <Radio
            value={addressId}
            // onChange={() => {
            //   setIsDefault(!isDefault);
            // }}
          />
        }
        label=" default address"
      />
      <StreetInputProfile
        streetProps={{
          type,
          profileStreet: address.streetName ? address.streetName : '',
          isDisable,
        }}
      />
      <CityInputProfile
        cityProps={{ type, profileCity: address.city, isDisable }}
      />
      <PostalCodeProfile
        postalProps={{
          isChange: isShippingCountryChange,
          type,
          profilePostalCode: address.postalCode,
          isDisable,
        }}
      />
      <CountryProfile
        countryProps={{
          isUpdate: () => updateCountry,
          type,
          profileCountry: address.country,
          isDisable,
        }}
      />
    </div>
  );
}
