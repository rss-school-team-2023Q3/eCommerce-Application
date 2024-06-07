import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext, useEffect, useState } from 'react';
import validate from 'shared/utils/validate';

function PasswordProfile({ isDisable }: { isDisable: boolean }) {
  const [isShowPasswordOld, setShowPasswordOld] = useState(false);
  const [isShowPasswordNew, setShowPasswordNew] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [passwordOld, setPasswordOld] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const formData = useContext(profileContext);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const handleClickShowPasswordOld = () => {
    setShowPasswordOld((show) => !show);
  };
  const handleClickShowPasswordNew = () => {
    setShowPasswordNew((show) => !show);
  };

  useEffect(() => {
    formData.oldPassword = '';
    formData.password.value = '';
    formData.password.isValid = false;
    setIsValid(true);
    setPasswordNew('');
    setPasswordOld('');
  }, [isDisable]);

  useEffect(() => {
    // if (!formData.fieldChangedSet) {
    //   throw new Error("formData.fieldChangedSet doesn't exist");
    // }

    const isPasswords = !!passwordOld && formData.password.value;

    if (
      isPasswords &&
      formData.password.isValid &&
      formData.password.value !== passwordOld
    ) {
      formData.fieldChangedSet?.add('password');
    } else formData.fieldChangedSet?.delete('password');
  }, [
    formData.password.isValid,
    isDisable,
    formData.fieldChangedSet,
    passwordOld,
    passwordNew,
  ]);

  function checkPassword(pass: string) {
    setPasswordNew(pass);
    setIsValid(!validate('password', pass));
    setPasswordErrorMessage(validate('password', pass));

    if (!validate('password', pass) && pass.length > 1) {
      formData.password.value = pass;
      formData.password.isValid = true;
    } else {
      formData.password.isValid = false;
    }
  }

  const isPasswordChanged =
    passwordOld !== passwordNew &&
    formData.password.isValid &&
    passwordOld &&
    passwordNew;

  return (
    !isDisable && (
      <div className="field-wrap">
        <TextField
          autoComplete="off"
          style={{ marginBottom: '10px', width: '50%' }}
          size="small"
          value={passwordOld}
          type={isShowPasswordOld ? 'text' : 'password'}
          onChange={(e) => {
            setPasswordOld(e.target.value);
            formData.oldPassword = e.target.value;
          }}
          required
          id="passwordOld"
          label="Old password"
          // helperText={isValid ? '' : passwordErrorMessage}
          FormHelperTextProps={{
            sx: {
              color: 'red',
              maxWidth: 320,
            },
          }}
          color="primary"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordOld}
                  edge="end"
                >
                  {isShowPasswordOld ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          value={passwordNew}
          autoComplete="off"
          style={{ marginBottom: '10px', width: '50%' }}
          size="small"
          type={isShowPasswordNew ? 'text' : 'password'}
          onChange={(e) => checkPassword(e.target.value)}
          required
          id="passwordNew"
          label="New password"
          helperText={isValid ? '' : passwordErrorMessage}
          FormHelperTextProps={{
            sx: {
              color: 'red',
              maxWidth: 320,
            },
          }}
          color={isValid ? 'primary' : 'error'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordNew}
                  edge="end"
                >
                  {isShowPasswordNew ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {isPasswordChanged && (
          <PublishedWithChangesIcon className="change-icon" />
        )}
      </div>
    )
  );
}

export default PasswordProfile;
