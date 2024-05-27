import { TextField } from '@mui/material';
import formContext from 'pages/SignUpPage/formContext';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/authApi/store/store';
import validate from 'shared/utils/validate';

function LastNameInput() {
  const [isValid, setIsValid] = useState(true);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
  const formData = useContext(formContext);

  const user = useSelector((state: RootState) => state.auth.user);

  const [lastName, setLastName] = useState(formData.lastName.value);

  useEffect(() => {
    if (user && typeof user.lastName === 'string') {
      formData.lastName.value = user.lastName;
      setLastName(user.lastName);
    }

    return () => {
      formData.lastName.value = '';
    };
  }, []);

  function checkLastName(name: string) {
    setIsValid(!validate('lastName', name));
    setLastNameErrorMessage(validate('lastName', name));

    if (!validate('lastName', name)) {
      formData.lastName.value = name;
      formData.lastName.isValid = true;
    } else {
      formData.lastName.isValid = false;
    }
  }

  return (
    <TextField
      value={lastName}
      id="last_name"
      label="Last Name"
      autoComplete="off"
      type="Text"
      style={{ marginBottom: '10px' }}
      helperText={isValid ? '' : lastNameErrorMessage}
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
