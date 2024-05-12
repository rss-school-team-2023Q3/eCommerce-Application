import { TextField } from '@mui/material';
import PostCodeInterface from 'pages/App/types/PostCodeInterface';
import { useState } from 'react';
import validate from 'shared/utils/validate';

function PostalCodeInput({ returnCode }: PostCodeInterface) {
  const [isValid, setIsValid] = useState(true);
  const regexp = /^[a-zA-Z]+$/;

  function checkCode(code: string) {
    setIsValid(validate(regexp, code));

    if (isValid) {
      returnCode(code);
    }
  }

  return (
    <TextField
      autoComplete="off"
      type="Text"
      style={{ marginBottom: '10px' }}
      required
      size="small"
      onChange={(e) => checkCode(e.target.value)}
      label="Postal Code"
      id="postal_code"
      helperText={isValid ? '' : 'Enter valid postal code'}
      FormHelperTextProps={{
        sx: {
          color: 'red',
        },
      }}
      color={isValid ? 'primary' : 'error'}
    />
  );
}

export default PostalCodeInput;
