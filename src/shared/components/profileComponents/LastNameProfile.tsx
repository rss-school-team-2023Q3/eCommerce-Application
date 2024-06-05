import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { TextField } from '@mui/material';
import FormField from 'pages/App/types/enums/formField';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/store';
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
  }, [user, formData.lastName]);

  useEffect(() => {
    if (isDisable && user?.lastName) {
      setLastName(user.lastName);
    }

    // if (!formData.fieldChangedSet) throw new Error("formData.fieldChanged doesn't exist");

    if (lastName === user?.lastName) {
      formData.fieldChangedSet?.delete(FormField.lastName);
    } else formData.fieldChangedSet?.add(FormField.lastName);
  }, [isDisable, lastName, user?.lastName, formData.fieldChangedSet]);

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

  const isLastNameChanged = lastName !== user?.lastName;

  return (
    <div className="field-wrap">
      <TextField
        className="input-field-profile"
        disabled={isDisable}
        value={lastName}
        id="last_name"
        label="Last Name"
        autoComplete="off"
        type="Text"
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
      {isLastNameChanged && (
        <PublishedWithChangesIcon className="change-icon" />
      )}
    </div>
  );
}

export default LastNameProfile;
