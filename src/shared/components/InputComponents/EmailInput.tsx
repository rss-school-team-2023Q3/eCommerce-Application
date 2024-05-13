import { TextField } from '@mui/material';
import { useState } from 'react';
import validate from 'shared/utils/validate';

import IEmailInterface from './InputComponentInterface/EmailInterface.ts';

function EmailInput({ returnEmail }: IEmailInterface) {
  const [isValid, setIsValid] = useState(true);
  const emailRegexp = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  function checkEmail(email: string) {
    setIsValid(validate(emailRegexp, email));

    if (validate(emailRegexp, email) && email.length > 1) {
      returnEmail(email);
    } else {
      returnEmail('');
    }
  }

  return (
    <TextField
      type="email"
      id="email"
      label="Email"
      autoComplete="off"
      style={{ marginBottom: '10px' }}
      required
      helperText={isValid ? '' : 'Enter valid eMail'}
      FormHelperTextProps={{
        sx: {
          color: 'red',
        },
      }}
      color={isValid ? 'primary' : 'error'}
      size="small"
      onChange={(e) => checkEmail(e.target.value)}
    />
  );
}

export default EmailInput;
