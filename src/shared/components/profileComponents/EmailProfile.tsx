import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { TextField } from '@mui/material';
import FormField from 'pages/App/types/enums/formField';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/store';
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
  }, [user, formData.email]);

  useEffect(() => {
    if (isDisable && user?.email) {
      setUserEmail(user.email);
    }

    if (!formData.fieldChangedSet) {
      throw new Error("formData.fieldChangedSet doesn't exist");
    }

    const isEmailChanged = userEmail !== user?.email;

    if (isEmailChanged) {
      formData.fieldChangedSet.add(FormField.email);
    } else {
      formData.fieldChangedSet.delete(FormField.email);
    }
  }, [isDisable, userEmail, user?.email, formData.fieldChangedSet]);

  function checkEmail(email: string) {
    setUserEmail(email);
    const emailValidationError = validate('email', email);
    const isEmailValid = !emailValidationError;

    setIsValid(isEmailValid);
    setEmailErrorMessage(emailValidationError);

    if (isEmailValid && email.length > 1) {
      formData.email.value = email;
      formData.email.isValid = true;
    } else {
      formData.email.isValid = false;
    }
  }

  const isEmailChanged = userEmail !== user?.email;

  return (
    <div className="field-wrap">
      <TextField
        className="input-field-profile"
        disabled={isDisable}
        value={userEmail}
        type="email"
        id="email"
        label="Email"
        autoComplete="off"
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
      {isEmailChanged && <PublishedWithChangesIcon className="change-icon" />}
    </div>
  );
}

export default EmailProfile;
