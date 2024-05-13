import { TextField } from '@mui/material';
import formContext from 'pages/SignUpPage/formContext';
import { useContext, useState } from 'react';
import validate from 'shared/utils/validate';

function FirstNameInput() {
  const [isValid, setIsValid] = useState(true);
  const regexp = /^[a-zA-Z]+$/;
  const formData = useContext(formContext);

  function checkName(name: string) {
    setIsValid(validate(regexp, name));

    if (validate(regexp, name)) {
      formData.name.value = name;
      formData.name.isValid = true;
    } else {
      formData.name.isValid = false;
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
