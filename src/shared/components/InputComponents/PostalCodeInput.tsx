import { TextField } from '@mui/material';
import formContext from 'pages/SignUpPage/formContext';
import { postcodeValidator } from 'postcode-validator';
import { useContext, useEffect, useState } from 'react';
import selectCountryCode from 'shared/utils/selectCountryCode';

interface IPostalPropsInterface {
  postalProps: { type: string; isChange: boolean };
}

function PostalCodeInput({ postalProps }: IPostalPropsInterface) {
  const formData = useContext(formContext);
  const [isValid, setIsValid] = useState(true);
  const country = postalProps.type === 'shipping'
    ? formData.shippingCountry.value
    : formData.billingCountry.value;
  const [code, setCode] = useState('1');

  function checkCode(value: string) {
    setCode(value);

    if (typeof country === 'string' && country.length > 1) {
      const countryCode = selectCountryCode(country);

      setIsValid(postcodeValidator(value, countryCode));

      if (
        postcodeValidator(value, countryCode)
        && postalProps.type === 'shipping'
      ) {
        formData.shippingCode.value = value;
        formData.shippingCode.isValid = true;
      } else if (
        postcodeValidator(value, countryCode)
        && postalProps.type === 'billing'
      ) {
        formData.billingCode.value = value;
        formData.billingCode.isValid = true;
      } else if (
        !postcodeValidator(value, countryCode)
        && postalProps.type === 'billing'
      ) {
        formData.billingCode.isValid = false;
      } else if (
        !postcodeValidator(value, countryCode)
        && postalProps.type === 'shipping'
      ) {
        formData.shippingCode.isValid = false;
      }
    }
  }

  useEffect(() => {
    checkCode(code);
  }, [postalProps.isChange]);

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
