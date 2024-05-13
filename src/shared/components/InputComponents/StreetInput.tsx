import { TextField } from '@mui/material';
import { useState } from 'react';
import validate from 'shared/utils/validate';

import IStreetInterface from './InputComponentInterface/StreetInterface.ts';

function StreetInput({ returnStreet }: IStreetInterface) {
  const [isValid, setIsValid] = useState(true);
  const regexp = /^[a-zA-Z]+$/;

  function checkStreet(name: string) {
    setIsValid(validate(regexp, name));

    if (validate(regexp, name)) {
      returnStreet(name);
    } else {
      returnStreet('');
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
