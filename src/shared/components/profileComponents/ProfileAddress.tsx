import { Address, Customer } from '@commercetools/platform-sdk';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { FormControlLabel, IconButton, Radio } from '@mui/material';
import createNewAddress from 'pages/ProfilePage/utils/createNewAddress.ts';
import profileContext from 'pages/ProfilePage/utils/profileContext.ts';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from 'shared/api/authApi/store/authSlice.ts';
import { RootState } from 'shared/api/store.ts';
import 'pages/ProfilePage/Profile.modules.css';
import CityInputProfile from 'shared/components/profileComponents/CityIpnputProfile';

import { currentClient } from 'shared/libs/commercetools/apiBuilder.ts';

import { toastSuccess } from 'shared/utils/notifications.ts';

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
  const dispatch = useDispatch();
  const customer: Customer | null = useSelector(
    (state: RootState) => state.auth.user,
  );
  const formData = useContext(profileContext);
  // const defaultType = `default${capitalizeFirstLetter(type)}AddressId` as DefaultType;

  if (!customer) {
    throw new Error('Error Profile Page');
  }

  // const [isDefault, setIsDefault] = useState(customer[defaultType] === addressId);
  // formData[defaultType] = customer[defaultType];
  let address: Address | undefined = customer.addresses.find(
    (addr) => addr.id === addressId,
  );

  if (
    (addressId === 'newShippingAddress' || addressId === 'newBillingAddress')
    && formData.addresses
  ) {
    address = createNewAddress(addressId, formData.addresses);
  }

  if (!address) throw new Error('Address dont find by id');

  const [isBillingCountryChange, setBillingCountryChange] = useState(
    !!customer.defaultBillingAddressId,
  );
  const [isShippingCountryChange, setShippingCountryChange] = useState(
    !!customer.defaultShippingAddressId,
  );
  // const formAddresses = formData.addresses;

  // if (!formAddresses) throw new Error('formData.addresses dont exist');

  // const cur = formAddresses.find((el) => el.id === addressId);

  // const v = cur?.value;

  // useEffect(() => {
  //   console.log('change customer.addresses');

  //   if (!v) return;

  //   const newId = customer.addresses.find(({ city: c, postalCode: p, streetName: s }) => {
  //     const isAddr = c === v.city.value && p === v.postalCode.value && s === v.streetName.value;

  //     return isAddr;
  //   })?.id;

  //   if (newId) cur.id = newId;
  // }, [customer.addresses]);

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

  async function removeAddress() {
    let res;

    if (
      typeof customer?.id === 'string'
      && typeof customer?.version === 'number'
    ) {
      res = await currentClient.removeAddress(
        addressId,
        customer.id,
        customer.version,
      );
    }

    if (res?.statusCode === 200) {
      toastSuccess('Address removed success');
      dispatch(setCredentials({ user: res.body }));

      if (formData.addresses) {
        formData.addresses = formData.addresses.filter(
          (el) => el.id !== addressId,
        );
      }
    }
  }

  return (
    <div className="data-field-input">
      <p>{`${index + 1} Address`}</p>

      {addressId !== 'newShippingAddress'
        && addressId !== 'newBillingAddress' && (
        <div className="label-address-wrap">
          <FormControlLabel
            control={<Radio value={addressId} />}
            label=" default address"
          />
          {!isDisable && (
            <IconButton onClick={() => removeAddress()} aria-label="delete">
              <DeleteForeverIcon />
            </IconButton>
          )}
        </div>
      )}
      <StreetInputProfile
        streetProps={{
          type,
          profileStreet: address.streetName ? address.streetName : '',
          isDisable,
          addressId,
        }}
      />
      <CityInputProfile
        cityProps={{
          type,
          profileCity: address.city,
          isDisable,
          addressId,
        }}
      />
      <PostalCodeProfile
        postalProps={{
          isChange: isShippingCountryChange,
          type,
          profilePostalCode: address.postalCode,
          isDisable,
          addressId,
        }}
      />
      <CountryProfile
        countryProps={{
          isUpdate: () => updateCountry,
          type,
          profileCountry: address.country,
          isDisable,
          addressId,
        }}
      />
    </div>
  );
}
