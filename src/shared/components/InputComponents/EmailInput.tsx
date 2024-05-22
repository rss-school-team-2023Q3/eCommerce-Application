import { TextField } from '@mui/material';
import formContext from 'pages/SignUpPage/formContext.ts';
import { useContext, useState } from 'react';
import validate from 'shared/utils/validate';

function EmailInput() {
  const [isValid, setIsValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const formData = useContext(formContext);

  function checkEmail(email: string) {
    setIsValid(!validate('email', email));
    setEmailErrorMessage(validate('email', email));

    if (!validate('email', email) && email.length > 1) {
      formData.email.value = email;
      formData.email.isValid = true;
    } else {
      formData.email.isValid = false;
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
      helperText={isValid ? '' : emailErrorMessage}
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
