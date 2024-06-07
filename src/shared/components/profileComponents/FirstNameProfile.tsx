import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { TextField } from '@mui/material';
import FormField from 'pages/App/types/enums/formField';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/api/store';
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
  }, [user, formData.name]);

  useEffect(() => {
    if (isDisable && user?.firstName) setFirstName(user.firstName);

    // if (!formData.fieldChangedSet) throw new Error("formData.fieldChangedSet doesn't exist");

    const isNameChanged = firstName !== user?.firstName;

    if (isNameChanged) {
      formData.fieldChangedSet?.add(FormField.firstName);
    } else formData.fieldChangedSet?.delete(FormField.firstName);
  }, [isDisable, firstName, user?.firstName, formData.fieldChangedSet]);

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

  const isNameChanged = firstName !== user?.firstName;

  return (
    <div className="field-wrap">
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
      {isNameChanged && <PublishedWithChangesIcon className="change-icon" />}
    </div>
  );
}

export default FirstNameProfile;
