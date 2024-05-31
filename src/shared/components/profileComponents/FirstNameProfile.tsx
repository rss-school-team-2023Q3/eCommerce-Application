import { TextField } from '@mui/material';
import FormField from 'pages/App/types/enums/formField';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/authApi/store/store';
import validate from 'shared/utils/validate';

function FirstNameProfile({ isDisable }: { isDisable: boolean }) {
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

  useEffect(() => {
    if (isDisable) setFirstName(user?.firstName ? user?.firstName : firstName);

    if (!formData.fieldChangedSet) throw new Error("formData.fieldChanged doesn't exist");

    if (
      firstName === user?.firstName
      && formData.fieldChangedSet.has(FormField.firstName)
    ) {
      formData.fieldChangedSet.delete(FormField.firstName);
    } else formData.fieldChangedSet.add(FormField.firstName);
  }, [isDisable, firstName]);

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
      disabled={isDisable}
      value={firstName}
      className="input-field-profile"
      id="first_name"
      label="First Name"
      autoComplete="off"
      type="Text"
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
