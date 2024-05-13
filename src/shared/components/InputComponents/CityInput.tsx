import { TextField } from '@mui/material';
import { useState } from 'react';
import validate from 'shared/utils/validate';

import ICityInterface from './InputComponentInterface/CityInterface.ts';

function CityInput({ returnCity }: ICityInterface) {
  const [isValid, setIsValid] = useState(true);
  const regexp = /^[a-zA-Z]+$/;

  function checkCity(name: string) {
    setIsValid(validate(regexp, name));

    if (validate(regexp, name)) {
      returnCity(name);
    } else {
      returnCity('');
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
      id="city"
      label="City"
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

export default CityInput;