import './SignUp.modules.css';
import { Button } from '@mui/material';
import { useContext, useState } from 'react';
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

  function validateForm() {
    setValid(formData.email.isValid);
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

  return (
    <div className="registration-wrapper">
      <formContext.Provider value={formData}>
        <form
          className="registration-form"
          action="registration"
          onChange={validateForm}
        >
          <div className="registration-form-field">
            <div className="data-field">
              User Data
              <EmailInput />
              <FirstNameInput />
              <LastNameInput />
              <DateInput />
              <PasswordInput />
            </div>
            <div className="data-field">
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
            </div>
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
                countryProps={{ isUpdate: updateCountry, type: 'shipping' }}
              />
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
