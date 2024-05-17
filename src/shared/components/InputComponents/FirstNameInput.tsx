import { TextField } from '@mui/material';
import formContext from 'pages/SignUpPage/formContext';
import { useContext, useState } from 'react';
import validate from 'shared/utils/validate';

function FirstNameInput() {
  const [isValid, setIsValid] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const formData = useContext(formContext);

  function checkName(name: string) {
    setIsValid(!validate('name', name));
    setNameErrorMessage(validate('name', name));

    if (validate('name', name)) {
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
      helperText={isValid ? '' : nameErrorMessage}
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
