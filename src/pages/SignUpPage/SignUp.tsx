import './SignUp.modules.css';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
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

import formContext from './formContext.ts';

function SignUp() {
  const [isValid, setValid] = useState(false);
  const formData = useContext(formContext);
  const [isBillingCountryChange, setBillingCountryChange] = useState(false);
  const [isShippingCountryChange, setShippingCountryChange] = useState(false);
  const [isSameAdress, setSameAdress] = useState(false);
  const [isShippingDefaut, setShippingDefault] = useState(false);
  const [isBillingDefaut, setBillingDefault] = useState(false);

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

    if (isValid) {
      return true;
    }

    return false;
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

  useEffect(() => {
    validateForm();
  }, [isBillingCountryChange, isShippingCountryChange]);

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
              <DateInput />
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
                    control={
                      <Checkbox
                        size="small"
                        checked={isBillingDefaut}
                        onChange={() => setBillingDefault(!isBillingDefaut)}
                      />
                    }
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
                      control={
                        <Checkbox
                          size="small"
                          checked={isShippingDefaut}
                          onChange={() => setShippingDefault(!isShippingDefaut)}
                        />
                      }
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
                  control={
                    <Checkbox
                      size="small"
                      checked={isSameAdress}
                      onChange={() => toogleSameAdress()}
                    />
                  }
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
    </div>
  );
}

export default SignUp;
