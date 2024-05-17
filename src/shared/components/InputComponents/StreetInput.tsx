import { TextField } from '@mui/material';
import formContext from 'pages/SignUpPage/formContext';
import { useContext, useState } from 'react';
import validate from 'shared/utils/validate';

interface IStreetInterface {
  streetProps: { type: string };
}

function StreetInput({ streetProps }: IStreetInterface) {
  const [isValid, setIsValid] = useState(true);
  const regexp = /^[a-zA-Z]+$/;
  const formData = useContext(formContext);

  function checkStreet(street: string) {
    setIsValid(validate(regexp, street));

    switch (validate(regexp, street)) {
      case true: {
        if (streetProps.type === 'shipping') {
          formData.shippingStreet.value = street;
          formData.shippingStreet.isValid = true;
        } else {
          formData.billingStreet.value = street;
          formData.billingStreet.isValid = true;
        }

        break;
      }
      default: {
        if (streetProps.type === 'shipping') {
          formData.shippingStreet.isValid = false;
        } else {
          formData.billingStreet.isValid = false;
        }
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
      onChange={(e) => checkStreet(e.target.value)}
      label="Street"
      helperText={isValid ? '' : 'Enter street name'}
      FormHelperTextProps={{
        sx: {
          color: 'red',
        },
      }}
      color={isValid ? 'primary' : 'error'}
    />
  );
}

export default StreetInput;
