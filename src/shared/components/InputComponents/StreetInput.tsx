import { TextField } from '@mui/material';
import formContext from 'pages/SignUpPage/formContext';
import { useContext, useState } from 'react';
import validate from 'shared/utils/validate';

function StreetInput() {
  const [isValid, setIsValid] = useState(true);
  const regexp = /^[a-zA-Z]+$/;
  const formData = useContext(formContext);

  function checkStreet(street: string) {
    setIsValid(validate(regexp, street));

    if (validate(regexp, street)) {
      formData.street.value = street;
      formData.street.isValid = true;
    } else {
      formData.street.isValid = false;
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
      id="street"
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
