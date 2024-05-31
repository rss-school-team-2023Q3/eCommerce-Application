import { TextField } from '@mui/material';
import FormField from 'pages/App/types/enums/formField';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/authApi/store/store';
import validate from 'shared/utils/validate';

function LastNameProfile({ isDisable }: { isDisable: boolean }) {
  const [isValid, setIsValid] = useState(true);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');

  const formData = useContext(profileContext);

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

  useEffect(() => {
    if (isDisable) setLastName(user?.lastName ? user?.lastName : lastName);

    if (!formData.fieldChangedSet) throw new Error("formData.fieldChanged doesn't exist");

    if (
      lastName === user?.lastName
      && formData.fieldChangedSet.has(FormField.lastName)
    ) {
      formData.fieldChangedSet.delete(FormField.lastName);
    } else if (lastName !== user?.lastName) formData.fieldChangedSet.add(FormField.lastName);
  }, [isDisable, lastName]);

  function checkLastName(name: string) {
    setLastName(name);
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
      disabled={isDisable}
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

export default LastNameProfile;
