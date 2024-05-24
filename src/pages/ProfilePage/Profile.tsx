import { Button, Checkbox, FormControlLabel } from '@mui/material';
import signInStoreLogic from 'pages/SignInPage/utils/signInStoreLogic';
import 'pages/SignUpPage/SignUp.modules.css';
import formContext from 'pages/SignUpPage/formContext';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CityInput from 'shared/components/InputComponents/CityInput';
import CountryInput from 'shared/components/InputComponents/CountryInput';
import DateInput from 'shared/components/InputComponents/DateInput';
import EmailInput from 'shared/components/InputComponents/EmailInput';
import FirstNameInput from 'shared/components/InputComponents/FirstNameInput';
import LastNameInput from 'shared/components/InputComponents/LastNameInput';
import PasswordInput from 'shared/components/InputComponents/PasswordInput';
import PostalCodeInput from 'shared/components/InputComponents/PostalCodeInput';
import StreetInput from 'shared/components/InputComponents/StreetInput';
import { ApiBuilder } from 'shared/libs/commercetools/apiBuilder';
import { createAddress } from 'shared/utils/createAddress';
import { toastError, toastSuccess } from 'shared/utils/notifications';
import toogleSameAdress from 'shared/utils/toogleSameAdress';

interface ISignupInterface {
  client: ApiBuilder;
}

export default function Profile({ client }: ISignupInterface) {
  const dispatch = useDispatch();
  const [isValid, setValid] = useState(false);
  const formData = useContext(formContext);
  const [isBillingCountryChange, setBillingCountryChange] = useState(false);
  const [isShippingCountryChange, setShippingCountryChange] = useState(false);
  const [isSameAdress, setSameAdress] = useState(false);
  const [isShippingDefaut, setShippingDefault] = useState(false);
  const [isBillingDefaut, setBillingDefault] = useState(false);
  const [isDateChange, setDateChange] = useState(false);

  function validateForm() {
    setValid(Object.values(formData).every((value) => value.isValid));
  }

  const submitSignUpData = async (event: { preventDefault: () => void }) => {
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

    const addresses = [
      createAddress(addressData, 'billing'),
      ...(isSameAdress ? [] : [createAddress(addressData, 'shipping')]),
    ];

    if (isValid) {
      const userData = {
        email: formData.email.value,
        password: formData.password.value,
        firstName: formData.name.value,
        lastName: formData.lastName.value,
        dateOfBirth: formData.date.value.format('YYYY-MM-DD'),
        addresses,
        billingAddresses: [0],
        shippingAddresses: isSameAdress ? [0] : [1],
        ...(isBillingDefaut && { defaultBillingAddress: 0 }),
        ...(isSameAdress
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
    <div className="registration-wrapper">
      <formContext.Provider value={formData}>
        <form
          className="registration-form"
          action="registration"
          onChange={validateForm}
        >
          <div className="registration-form-field">
            <div
              className={
                isSameAdress ? 'user-field fifty-percent' : 'user-field'
              }
            >
              User Data
              <EmailInput />
              <FirstNameInput />
              <LastNameInput />
              <DateInput
                dateProps={{
                  isChange: dateChange,
                }}
              />
              <PasswordInput />
            </div>
            <div
              className={
                isSameAdress ? 'adress-field fifty-percent' : 'adress-field'
              }
            >
              <div
                className={
                  isSameAdress
                    ? 'adress-input-field hundred-percent'
                    : 'adress-input-field'
                }
              >
                <div
                  className={
                    isSameAdress ? 'data-field hundred-percent' : 'data-field'
                  }
                >
                  {isSameAdress
                    ? 'Billing & Shipping Adress'
                    : 'Billing Adress'}
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
                    label="Use as default adress"
                  />
                </div>
                {isSameAdress !== true ? (
                  <div className="data-field">
                    Shipping Adress
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
                      label="Use as default adress"
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="adress-switch-field">
                <FormControlLabel
                  className="switch-field"
                  control={(
                    <Checkbox
                      size="small"
                      checked={isSameAdress}
                      onChange={() => {
                        toogleSameAdress(formData, isSameAdress);
                        setSameAdress(!isSameAdress);
                      }}
                    />
                  )}
                  label="Use same billing & shipping adress"
                />
              </div>
            </div>
          </div>
          <Button
            variant="contained"
            color={isValid ? 'primary' : 'error'}
            onClick={submitSignUpData}
          >
            Sign Up
          </Button>
        </form>
      </formContext.Provider>
    </div>
  );
}
