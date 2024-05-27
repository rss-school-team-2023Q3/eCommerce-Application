import { Customer } from '@commercetools/platform-sdk';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import signInStoreLogic from 'pages/SignInPage/utils/signInStoreLogic';
import formContext from 'pages/SignUpPage/formContext';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'shared/api/authApi/store/store';
import CityInput from 'shared/components/InputComponents/CityInput';
import CountryInput from 'shared/components/InputComponents/CountryInput';
import EmailInput from 'shared/components/InputComponents/EmailInput';
import FirstNameInput from 'shared/components/InputComponents/FirstNameInput';
import LastNameInput from 'shared/components/InputComponents/LastNameInput';
// import PasswordInput from 'shared/components/InputComponents/PasswordInput';
import PostalCodeInput from 'shared/components/InputComponents/PostalCodeInput';
import StreetInput from 'shared/components/InputComponents/StreetInput';
import DateInputProfile from 'shared/components/profileComponents/DateInputProfile';
import { ApiBuilder } from 'shared/libs/commercetools/apiBuilder';
import { createAddress } from 'shared/utils/createAddress';
import { toastError, toastSuccess } from 'shared/utils/notifications';
import toogleSameAdress from 'shared/utils/toogleSameAdress';

import './Profile.modules.css';

interface ISignupInterface {
  client: ApiBuilder;
}

export default function Profile({ client }: ISignupInterface) {
  const dispatch = useDispatch();
  const [isValid, setValid] = useState(false);
  const customer: Customer | null = useSelector(
    (state: RootState) => state.auth.user,
  );

  if (!customer) {
    throw new Error('Error Profile Page');
  }

  const formData = useContext(formContext);

  const { billingAddressIds, shippingAddressIds } = customer;
  const [isBillingCountryChange, setBillingCountryChange] = useState(
    !!customer.defaultBillingAddressId,
  );
  const [isShippingCountryChange, setShippingCountryChange] = useState(
    !!customer.defaultShippingAddressId,
  );
  const isAddresses = !!(billingAddressIds && shippingAddressIds);
  const [isSameAddress, setSameAddress] = useState(
    isAddresses && billingAddressIds[0] === shippingAddressIds[0],
  );

  const [isShippingDefaut, setShippingDefault] = useState(
    isShippingCountryChange,
  );
  const [isBillingDefaut, setBillingDefault] = useState(
    !!customer?.defaultBillingAddressId,
  );
  const [isDateChange, setDateChange] = useState(false);

  function validateForm() {
    setValid(Object.values(formData).every((value) => value.isValid));
  }

  const submitChangedData = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let resp;
    const addressData = {
      billingCountry: { value: formData.billingCountry.value },
      billingCity: { value: formData.billingCity.value },
      billingCode: { value: formData.billingCode.value },
      billingStreet: { value: formData.billingStreet.value },
      shippingCountry: { value: formData.shippingCountry.value },
      shippingCity: { value: formData.shippingCity.value },
      shippingCode: { value: formData.shippingCode.value },
      shippingStreet: { value: formData.shippingStreet.value },
    };

    const addressesSend = [
      createAddress(addressData, 'billing'),
      ...(isSameAddress ? [] : [createAddress(addressData, 'shipping')]),
    ];

    if (isValid) {
      const userData = {
        email: formData.email.value,
        password: formData.password.value,
        firstName: formData.name.value,
        lastName: formData.lastName.value,
        dateOfBirth: formData.date.value.format('YYYY-MM-DD'),
        addresses: addressesSend,
        billingAddresses: [0],
        shippingAddresses: isSameAddress ? [0] : [1],
        ...(isBillingDefaut && { defaultBillingAddress: 0 }),
        ...(isSameAddress
          ? isBillingDefaut && { defaultShippingAddress: 0 }
          : isShippingDefaut && { defaultShippingAddress: 1 }),
      };
      try {
        await client.registerUser(userData);
        await signInStoreLogic(userData.email, userData.password, dispatch);
        toastSuccess('User created');
      } catch (error) {
        if (error instanceof Error) {
          toastError(error.message);
        }
      }
    }

    return resp;
  };

  const updateCountry = (type: string) => {
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

  function dateChange() {
    setDateChange(!isDateChange);
  }

  useEffect(() => {
    validateForm();
  }, [isBillingCountryChange, isShippingCountryChange, isDateChange]);

  return (
    <div className="profile-wrapper">
      <formContext.Provider value={formData}>
        <form
          className="profile-form"
          action="registration"
          onChange={validateForm}
        >
          <div className="profile-form-field">
            <div className="user-field-profile">
              User Data
              <EmailInput />
              <FirstNameInput />
              <LastNameInput />
              <DateInputProfile
                dateProps={{
                  isChange: dateChange,
                }}
              />
              {/* <PasswordInput /> */}
            </div>
            <div className="address-field">
              <div className="address-input-field">
                <div
                  className={
                    isSameAddress
                      ? 'data-field-profile hundred-percent'
                      : 'data-field-profile'
                  }
                >
                  Billing Address
                  <StreetInput
                    streetProps={{
                      type: 'billing',
                    }}
                  />
                  <CityInput
                    cityProps={{
                      type: 'billing',
                    }}
                  />
                  <PostalCodeInput
                    postalProps={{
                      isChange: isBillingCountryChange,
                      type: 'billing',
                    }}
                  />
                  <CountryInput
                    countryProps={{ isUpdate: updateCountry, type: 'billing' }}
                  />
                  <FormControlLabel
                    className="switch-field"
                    control={(
                      <Checkbox
                        size="small"
                        checked={isBillingDefaut}
                        onChange={() => setBillingDefault(!isBillingDefaut)}
                      />
                    )}
                    label="Use as default address"
                  />
                </div>
                {isSameAddress !== true ? (
                  <div className="data-field-profile">
                    Shipping Address
                    <StreetInput
                      streetProps={{
                        type: 'shipping',
                      }}
                    />
                    <CityInput
                      cityProps={{
                        type: 'shipping',
                      }}
                    />
                    <PostalCodeInput
                      postalProps={{
                        isChange: isShippingCountryChange,
                        type: 'shipping',
                      }}
                    />
                    <CountryInput
                      countryProps={{
                        isUpdate: updateCountry,
                        type: 'shipping',
                      }}
                    />
                    <FormControlLabel
                      className="switch-field"
                      control={(
                        <Checkbox
                          size="small"
                          checked={isShippingDefaut}
                          onChange={() => setShippingDefault(!isShippingDefaut)}
                        />
                      )}
                      label="Use as default address"
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="address-switch-field">
                <FormControlLabel
                  className="switch-field"
                  control={(
                    <Checkbox
                      size="small"
                      checked={isSameAddress}
                      onChange={() => {
                        toogleSameAdress(formData, isSameAddress);
                        setSameAddress(!isSameAddress);
                      }}
                    />
                  )}
                  label="Use same billing & shipping address"
                />
              </div>
            </div>
          </div>
          <Button
            variant="contained"
            color={isValid ? 'primary' : 'error'}
            onClick={submitChangedData}
          >
            Change data
          </Button>
        </form>
      </formContext.Provider>
    </div>
  );
}
