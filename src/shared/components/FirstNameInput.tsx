import { TextField } from '@mui/material';
import NameInterface from 'pages/App/types/NameInterface';
import { useState } from 'react';
import validate from 'shared/utils/validate';

function FirstNameInput({ returnName }: NameInterface) {
  const [isValid, setIsValid] = useState(true);
  const regexp = /^[a-zA-Z]+$/;

  function checkName(name: string) {
    setIsValid(validate(regexp, name));

    if (isValid) {
      returnName(name);
    }
  }

  return (
    <TextField
      id="first_name"
      label="First Name"
      autoComplete="off"
      type="Text"
      style={{ marginBottom: '10px' }}
      required
      helperText={isValid ? '' : 'Enter your Name'}
      FormHelperTextProps={{
        sx: {
          color: 'red',
        },
      }}
      color={isValid ? 'primary' : 'error'}
      size="small"
      onChange={(e) => checkName(e.target.value)}
    />
  );
}

export default FirstNameInput;
