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

  function validateForm() {
    setValid(Object.values(formData).every((value) => value.isValid));
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
              className="user-field"
              style={{ width: isSameAdress ? '50%' : '' }}
            >
              User Data
              <EmailInput />
              <FirstNameInput />
              <LastNameInput />
              <DateInput />
              <PasswordInput />
            </div>
            <div
              className="adress-field"
              style={{ width: isSameAdress ? '50%' : '' }}
            >
              <div
                className="adress-input-field"
                style={{ width: isSameAdress ? '100%' : '' }}
              >
                <div
                  className="data-field"
                  style={{ width: isSameAdress ? '100%' : '' }}
                >
                  Billing Adress
                  <StreetInput />
                  <CityInput />
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
                        checked={isSameAdress}
                        onChange={() => setSameAdress(!isSameAdress)}
                      />
                    )}
                    label="Use as default adress"
                  />
                </div>
                {isSameAdress !== true ? (
                  <div className="data-field">
                    Shipping Adress
                    <StreetInput />
                    <CityInput />
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
                          checked={isSameAdress}
                          onChange={() => setSameAdress(!isSameAdress)}
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
                      onChange={() => setSameAdress(!isSameAdress)}
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
    </div>
  );
}

export default SignUp;
