import './SignUp.modules.css';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CityInput from 'widgets/InputComponents/CityInput';
import CountryInput from 'widgets/InputComponents/CountryInput';
import DateInput from 'widgets/InputComponents/DateInput';
import EmailInput from 'widgets/InputComponents/EmailInput';
import FirstNameInput from 'widgets/InputComponents/FirstNameInput';
import LastNameInput from 'widgets/InputComponents/LastNameInput';
import PasswordInput from 'widgets/InputComponents/PasswordInput';
import PostalCodeInput from 'widgets/InputComponents/PostalCodeInput';
import StreetInput from 'widgets/InputComponents/StreetInput';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState(dayjs);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [code, setCode] = useState('');
  const [isValid, setValid] = useState(false);
  const [country, setCountry] = useState('');
  const [isCountryChange, setCountryChange] = useState(false);

  function validateForm() {
    setValid(
      !!email &&
        !!password &&
        !!name &&
        !!lastName &&
        !!date &&
        !!street &&
        !!city &&
        !!code &&
        !!country
    );
  }

  const submitSignUpData = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (isValid) {
      return true;
    }

    return false;
  };

  const updateCountry = (value: string) => {
    setCountry(value);
    setCountryChange(!isCountryChange);
  };

  useEffect(() => {
    validateForm();
  }, [
    email,
    password,
    name,
    lastName,
    date,
    street,
    city,
    code,
    country,
    isValid,
  ]);

  return (
    <div className="login-wrapper">
      <form className="login-form" action="registration">
        <EmailInput returnEmail={setEmail} />
        <FirstNameInput returnName={setName} />
        <LastNameInput returnLastName={setLastName} />
        <DateInput returnDate={setDate} />
        <PasswordInput returnPassword={setPassword} />
        <StreetInput returnStreet={setStreet} />
        <CityInput returnCity={setCity} />
        <PostalCodeInput
          returnCode={setCode}
          isCountryChange={isCountryChange}
        />
        <CountryInput returnCountry={updateCountry} />
        <Button
          variant="contained"
          color={isValid ? 'primary' : 'error'}
          onClick={submitSignUpData}
        >
          Sign Up
        </Button>
      </form>
      <div>
        <NavLink className="login-link" to="/signin">
          Already have an account? Sign In
        </NavLink>
      </div>
    </div>
  );
}

export default SignUp;
