import { TextField } from '@mui/material';
import EmailInterface from 'pages/App/types/EmailInterface';
import { useState } from 'react';
import validate from 'shared/utils/validate';

function EmailInput({ returnEmail }: EmailInterface) {
  const [isValid, setIsValid] = useState(true);
  const emailRegexp = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  function checkEmail(email: string) {
    setIsValid(validate(emailRegexp, email));

    if (isValid) {
      returnEmail(email);
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
