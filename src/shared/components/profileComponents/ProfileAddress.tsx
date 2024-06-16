import { Address, Customer } from '@commercetools/platform-sdk';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { FormControlLabel, IconButton, Radio } from '@mui/material';
import FormField from 'pages/App/types/enums/formField.ts';
import createNewAddress from 'pages/ProfilePage/utils/createNewAddress.ts';
import profileContext from 'pages/ProfilePage/utils/profileContext.ts';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from 'shared/api/authApi/store/authSlice.ts';
import { RootState } from 'shared/api/store.ts';
import 'pages/ProfilePage/Profile.modules.css';
import CityInputProfile from 'shared/components/profileComponents/CityIpnputProfile';

import { currentClient } from 'shared/libs/commercetools/apiBuilder.ts';

import { toastSuccess } from 'shared/utils/notifications.ts';

import selectCountryCode from 'shared/utils/selectCountryCode.ts';

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
    (state: RootState) => state.auth.user
  );
  const formData = useContext(profileContext);

  const [isChanged, setIsChanged] = useState(false);

  let address: Address | undefined = customer?.addresses.find(
    (addr) => addr.id === addressId
  );

  if (
    (addressId === 'newShippingAddress' || addressId === 'newBillingAddress') &&
    formData.addresses
  ) {
    address = createNewAddress(addressId, formData.addresses);
  }

  // if (!address) throw new Error('Address dont find by id');

  const formAddr = formData.addresses?.find((el) => el.id === addressId)?.value;
  const [isBillingCountryChange, setBillingCountryChange] = useState(
    !!customer?.defaultBillingAddressId
  );
  const [isShippingCountryChange, setShippingCountryChange] = useState(
    !!customer?.defaultShippingAddressId
  );

  useEffect(() => {
    if (formAddr) {
      const isValid = Object.values(formAddr).every((el) => el.isValid);

      const isChangeForm = Object.entries(formAddr).some((el) => {
        const [k, v] = el;

        const newVal = k === 'country' ? selectCountryCode(v.value) : v.value;

        if (typeof k === 'string' && address)
          return newVal !== address[k as keyof Address];

        return false;
      });

      setIsChanged(isValid && isChangeForm);
    }
  }, [
    formAddr?.city.value,
    formAddr?.postalCode.value,
    formAddr?.streetName.value,
    formAddr?.country.value,
  ]);

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
      typeof customer?.id === 'string' &&
      typeof customer?.version === 'number'
    ) {
      res = await currentClient.removeAddress(
        addressId,
        customer.id,
        customer.version
      );
    }

    if (res?.statusCode === 200) {
      toastSuccess('Address removed success');
      dispatch(setCredentials({ user: res.body }));

      if (formData.addresses) {
        formData.addresses = formData.addresses.filter(
          (el) => el.id !== addressId
        );
      }
    }
  }

  async function changeAddress() {
    let res;

    if (
      typeof customer?.id === 'string' &&
      typeof customer?.version === 'number'
    ) {
      if (!formAddr) return null;

      const newAddress = Object.entries(formAddr).reduce((acc, entry) => {
        const [k, v] = entry;
        const val =
          k === FormField.country ? selectCountryCode(v.value) : v.value;
        const newEntity = {
          [k as keyof Address]: val,
        };

        return { ...acc, ...newEntity };
      }, {} as Address);

      res = await currentClient.changeAddress(
        newAddress,
        addressId,
        customer.id,
        customer.version
      );

      if (res?.statusCode === 200) {
        toastSuccess('address updated');
        dispatch(setCredentials({ user: res.body }));
        setIsChanged(false);
      }
    }

    return null;
  }

  return (
    <div className="data-field-input">
      <p>{`${index + 1} Address`}</p>

      {addressId !== 'newShippingAddress' &&
        addressId !== 'newBillingAddress' && (
          <div className="label-address-wrap">
            <FormControlLabel
              control={<Radio value={addressId} />}
              label=" default address"
            />
            {isChanged && (
              <IconButton onClick={() => changeAddress()} aria-label="delete">
                <SaveAsIcon />
              </IconButton>
            )}
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
          profileStreet: address?.streetName ? address.streetName : '',
          isDisable,
          addressId,
        }}
      />
      <CityInputProfile
        cityProps={{
          type,
          profileCity: address?.city,
          isDisable,
          addressId,
        }}
      />
      <PostalCodeProfile
        postalProps={{
          isChange: isShippingCountryChange,
          type,
          profilePostalCode: address?.postalCode,
          isDisable,
          addressId,
        }}
      />
      <CountryProfile
        countryProps={{
          isUpdate: () => updateCountry,
          type,
          profileCountry: address?.country,
          isDisable,
          addressId,
        }}
      />
    </div>
  );
}
