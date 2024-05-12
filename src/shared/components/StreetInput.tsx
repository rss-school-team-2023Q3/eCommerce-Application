import { TextField } from '@mui/material';
import StreetInterface from 'pages/App/types/StreetInterface';
import { useState } from 'react';
import validate from 'shared/utils/validate';

function StreetInput({ returnStreet }: StreetInterface) {
  const [isValid, setIsValid] = useState(true);
  const regexp = /^[a-zA-Z]+$/;

  function checkStreet(name: string) {
    setIsValid(validate(regexp, name));

    if (isValid) {
      returnStreet(name);
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
