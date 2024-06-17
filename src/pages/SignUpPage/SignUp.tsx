import './SignUp.modules.css';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from '@mui/material';
import IClient from 'pages/App/types/interfaces/IClientInterface.ts';
import signInStoreLogic from 'pages/SignInPage/utils/signInStoreLogic.ts';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CityInput from 'shared/components/InputComponents/CityInput';
import CountryInput from 'shared/components/InputComponents/CountryInput';
import DateInput from 'shared/components/InputComponents/DateInput';
import EmailInput from 'shared/components/InputComponents/EmailInput';
import FirstNameInput from 'shared/components/InputComponents/FirstNameInput';
import LastNameInput from 'shared/components/InputComponents/LastNameInput';
import PasswordInput from 'shared/components/InputComponents/PasswordInput';
import PostalCodeInput from 'shared/components/InputComponents/PostalCodeInput';
import StreetInput from 'shared/components/InputComponents/StreetInput';
import { createAddress } from 'shared/utils/createAddress.ts';
import { toastError, toastSuccess } from 'shared/utils/notifications.ts';

import formContext, { initialContext } from './formContext.ts';

function SignUp({ client }: IClient) {
  const dispatch = useDispatch();
  const [isValid, setValid] = useState(false);
  let formData = useContext(formContext);
  const [isBillingCountryChange, setBillingCountryChange] = useState(false);
  const [isShippingCountryChange, setShippingCountryChange] = useState(false);
  const [isSameAdress, setSameAdress] = useState(false);
  const [isShippingDefaut, setShippingDefault] = useState(false);
  const [isBillingDefaut, setBillingDefault] = useState(false);
  const [isDateChange, setDateChange] = useState(false);

  function validateForm() {
    setValid(Object.values(formData).every((value) => value.isValid));
  }

  function toogleSameAdress() {
    switch (isSameAdress) {
      case true: {
        formData.shippingCode.value = ' ';
        formData.shippingCode.isValid = false;
        formData.shippingStreet.value = ' ';
        formData.shippingStreet.isValid = false;
        formData.shippingCity.value = ' ';
        formData.shippingCity.isValid = false;
        formData.shippingCountry.value = ' ';
        formData.shippingCountry.isValid = false;
        break;
      }
      case false: {
        formData.shippingCode.value = formData.billingCode.value;
        formData.shippingCode.isValid = true;
        formData.shippingStreet.value = formData.billingStreet.value;
        formData.shippingStreet.isValid = true;
        formData.shippingCity.value = formData.billingCity.value;
        formData.shippingCity.isValid = true;
        formData.shippingCountry.value = formData.billingCountry.value;
        formData.shippingCountry.isValid = true;
        break;
      }
      default: {
        break;
      }
    }

    setSameAdress(!isSameAdress);
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
      createAddress(addressData, 'shipping'),
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
        shippingAddresses: [1],
        ...(isBillingDefaut && { defaultBillingAddress: 0 }),
        ...(isSameAdress
          ? isBillingDefaut && { defaultShippingAddress: 1 }
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
    formData = structuredClone(initialContext);

    return () => {
      formData = structuredClone(initialContext);
    };
  }, []);

  useEffect(() => {
    validateForm();
  }, [isBillingCountryChange, isShippingCountryChange, isDateChange]);

  return (
    <div className="registration-wrapper">
      <Typography className="page-title" variant="h2">
        Register
      </Typography>
      <Paper className="registration-paper">
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
                      countryProps={{
                        isUpdate: updateCountry,
                        type: 'billing',
                      }}
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
                        onChange={() => toogleSameAdress()}
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
        <div>
          <NavLink className="login-link" to="/signin">
            Already have an account? Sign In
          </NavLink>
        </div>
      </Paper>
    </div>
  );
}

export default SignUp;
