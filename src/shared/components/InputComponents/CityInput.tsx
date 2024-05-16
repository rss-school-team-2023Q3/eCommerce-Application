import { TextField } from '@mui/material';
import formContext from 'pages/SignUpPage/formContext';
import { useContext, useState } from 'react';
import validate from 'shared/utils/validate';

interface ICityInterface {
  cityProps: { type: string };
}

function CityInput({ cityProps }: ICityInterface) {
  const [isValid, setIsValid] = useState(true);
  const regexp = /^[a-zA-Z]+$/;
  const formData = useContext(formContext);

  function checkCity(city: string) {
    setIsValid(validate(regexp, city));

    switch (validate(regexp, city)) {
      case true: {
        if (cityProps.type === 'shipping') {
          formData.shippingCity.value = city;
          formData.shippingCity.isValid = true;
        } else {
          formData.billingCity.value = city;
          formData.billingCity.isValid = true;
        }

        break;
      }
      default: {
        if (cityProps.type === 'shipping') {
          formData.shippingCity.isValid = false;
        } else {
          formData.billingCity.isValid = false;
        }

        break;
      }
    }
  }

  return (
    <TextField
      autoComplete="off"
      type="Text"
      size="small"
      style={{ marginBottom: '10px' }}
      required
      onChange={(e) => checkCity(e.target.value)}
      label="City"
      helperText={isValid ? '' : 'Enter city name'}
      FormHelperTextProps={{
        sx: {
          color: 'red',
        },
      }}
      color={isValid ? 'primary' : 'error'}
    />
  );
}

export default CityInput;
