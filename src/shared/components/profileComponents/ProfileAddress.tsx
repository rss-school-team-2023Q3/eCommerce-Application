import { Address, Customer } from '@commercetools/platform-sdk';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/authApi/store/store';
import 'pages/ProfilePage/Profile.modules.css';
import CityInputProfile from 'shared/components/profileComponents/CityIpnputProfile';

import CountryProfile from './CountryProfile.tsx';
import PostalCodeProfile from './PostalCodeProfile.tsx';
import StreetInputProfile from './StreetProfile.tsx';

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
    (state: RootState) => state.auth.user,
  );

  if (!customer) {
    throw new Error('Error Profile Page');
  }

  const address: Address | undefined = customer.addresses.find(
    (addr) => addr.id === addressId,
  );

  if (!address) throw new Error('Address dont find by id');

  // const { billingAddressIds, shippingAddressIds } = customer;
  const [isBillingCountryChange, setBillingCountryChange] = useState(
    !!customer.defaultBillingAddressId,
  );
  const [isShippingCountryChange, setShippingCountryChange] = useState(
    !!customer.defaultShippingAddressId,
  );
  // const isAddresses = !!(billingAddressIds && shippingAddressIds);
  // const [isSameAddress, setSameAddress] = useState(
  //   isAddresses && billingAddressIds[0] === shippingAddressIds[0],
  // );

  // const [isShippingDefaut, setShippingDefault] = useState(
  //   isShippingCountryChange,
  // );
  // const [isBillingDefaut, setBillingDefault] = useState(
  //   !!customer?.defaultBillingAddressId,
  // );
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
      {/* <div style={{ display: 'flex' }}> */}
      <CountryProfile
        countryProps={{
          isUpdate: () => updateCountry,
          type,
          profileCountry: address.country,
          isDisable,
        }}
      />
      {/* </div> */}
    </div>
  );
}
