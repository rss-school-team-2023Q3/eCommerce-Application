import { TextField } from '@mui/material';
import { postcodeValidator } from 'postcode-validator';
import { useEffect, useState } from 'react';
import selectCountryCode from 'shared/utils/selectCountryCode';

import IPostCodeInterface from './InputComponentInterface/PostCodeInterface.ts';

function PostalCodeInput({ returnCode, isCountryChange }: IPostCodeInterface) {
  const [isValid, setIsValid] = useState(true);
  const [code, setCode] = useState('1');

  function checkCode(value: string) {
    setCode(value);
    const country = document.getElementById('country')?.innerText;

    if (typeof country === 'string' && country.length > 1) {
      const countryCode = selectCountryCode(country);

      setIsValid(postcodeValidator(value, countryCode));

      if (postcodeValidator(value, countryCode)) {
        returnCode(code);
      } else {
        returnCode('');
      }
    }
  }

  useEffect(() => {
    checkCode(code);
  }, [isCountryChange]);

  return (
    <TextField
      autoComplete="off"
      type="Text"
      style={{ marginBottom: '10px' }}
      required
      size="small"
      onChange={(e) => checkCode(e.target.value)}
      label="Postal Code"
      id="postal_code"
      helperText={isValid ? '' : 'Enter valid postal code'}
      FormHelperTextProps={{
        sx: {
          color: 'red',
        },
      }}
      color={isValid ? 'primary' : 'error'}
    />
  );
}

export default PostalCodeInput;
