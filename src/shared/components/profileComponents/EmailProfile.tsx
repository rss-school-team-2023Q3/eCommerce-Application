import { TextField } from '@mui/material';
import FormField from 'pages/App/types/enums/formField';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/authApi/store/store';
import validate from 'shared/utils/validate';

function EmailProfile({ isDisable }: { isDisable: boolean }) {
  const [isValid, setIsValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const formData = useContext(profileContext);
  const user = useSelector((state: RootState) => state.auth.user);

  const [userEmail, setUserEmail] = useState(formData.email.value);

  useEffect(() => {
    if (user) {
      formData.email.value = user.email;
      setUserEmail(user.email);
    }

    return () => {
      formData.email.value = '';
    };
  }, []);

  useEffect(() => {
    if (isDisable) setUserEmail(user?.email ? user?.email : userEmail);

    if (!formData.fieldChangedSet) throw new Error("formData.fieldChangedSet doesn't exist");

    if (
      userEmail === user?.email
      && formData.fieldChangedSet.has(FormField.email)
    ) {
      formData.fieldChangedSet.delete(FormField.email);
    } else if (userEmail !== user?.email) formData.fieldChangedSet.add(FormField.email);
  }, [isDisable, userEmail]);

  function checkEmail(email: string) {
    setUserEmail(email);
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
      disabled={isDisable}
      value={userEmail}
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

export default EmailProfile;
