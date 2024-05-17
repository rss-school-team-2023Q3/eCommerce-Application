import { TextField } from '@mui/material';
import formContext from 'pages/SignUpPage/formContext';
import { useContext, useState } from 'react';
import validate from 'shared/utils/validate';

interface IStreetInterface {
  streetProps: { type: string };
}

function StreetInput({ streetProps }: IStreetInterface) {
  const [isValid, setIsValid] = useState(true);
  const [streetErrorMessage, setStreetErrorMessage] = useState('');

  const formData = useContext(formContext);

  function checkStreet(street: string) {
    setIsValid(!validate('street', street));
    setStreetErrorMessage(validate('street', street));

    switch (!validate('street', street)) {
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
      helperText={isValid ? '' : streetErrorMessage}
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
