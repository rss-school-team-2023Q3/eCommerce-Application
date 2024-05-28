import { TextField } from '@mui/material';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/authApi/store/store';
import validate from 'shared/utils/validate';

function FirstNameProfile() {
  const [isValid, setIsValid] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState('');

  const formData = useContext(profileContext);

  const user = useSelector((state: RootState) => state.auth.user);

  const [firstName, setFirstName] = useState(formData.name.value);

  useEffect(() => {
    if (user && typeof user.firstName === 'string') {
      formData.name.value = user.firstName;
      setFirstName(user.firstName);
    }

    return () => {
      formData.name.value = '';
    };
  }, []);

  function checkName(name: string) {
    setFirstName(name);
    setIsValid(!validate('name', name));
    setNameErrorMessage(validate('name', name));

    if (!validate('name', name)) {
      setFirstName(name);
      formData.name.value = name;
      formData.name.isValid = true;
    } else {
      formData.name.isValid = false;
    }
  }

  return (
    <TextField
      value={firstName}
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

export default FirstNameProfile;
