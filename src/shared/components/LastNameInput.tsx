import { TextField } from '@mui/material';
import LastNameInterface from 'pages/App/types/LastNameInterface';
import { useState } from 'react';
import validate from 'shared/utils/validate';

function LastNameInput({ returnLastName }: LastNameInterface) {
  const [isValid, setIsValid] = useState(true);
  const regexp = /^[a-zA-Z]+$/;

  function checkLastName(name: string) {
    setIsValid(validate(regexp, name));

    if (isValid) {
      returnLastName(name);
    }
  }

  return (
    <TextField
      id="last_name"
      label="Last Name"
      autoComplete="off"
      type="Text"
      style={{ marginBottom: '10px' }}
      helperText={isValid ? '' : 'Enter your Last name'}
      FormHelperTextProps={{
        sx: {
          color: 'red',
        },
      }}
      color={isValid ? 'primary' : 'error'}
      required
      size="small"
      onChange={(e) => checkLastName(e.target.value)}
    />
  );
}

export default LastNameInput;
