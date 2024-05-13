import { TextField } from '@mui/material';
import formContext from 'pages/SignUpPage/formContext';
import { useContext, useState } from 'react';
import validate from 'shared/utils/validate';

function LastNameInput() {
  const [isValid, setIsValid] = useState(true);
  const regexp = /^[a-zA-Z]+$/;
  const formData = useContext(formContext);

  function checkLastName(name: string) {
    setIsValid(validate(regexp, name));

    if (validate(regexp, name)) {
      formData.lastName.value = name;
      formData.lastName.isValid = true;
    } else {
      formData.lastName.isValid = false;
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
