import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import profileContext from 'pages/ProfilePage/utils/profileContext';
import { useContext, useState } from 'react';
import validate from 'shared/utils/validate';

function PasswordProfile({ isDisable }: { isDisable: boolean }) {
  const [isShowPasswordOld, setShowPasswordOld] = useState(false);
  const [isShowPasswordNew, setShowPasswordNew] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const formData = useContext(profileContext);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const handleClickShowPasswordOld = () => {
    setShowPasswordOld((show) => !show);
  };
  const handleClickShowPasswordNew = () => {
    setShowPasswordNew((show) => !show);
  };

  function checkPassword(pass: string) {
    setIsValid(!validate('password', pass));
    setPasswordErrorMessage(validate('password', pass));

    if (!validate('password', pass) && pass.length > 1) {
      formData.password.value = pass;
      formData.password.isValid = true;
    } else {
      formData.password.isValid = false;
    }
  }

  return (
    !isDisable && (
      <div>
        <TextField
          autoComplete="off"
          style={{ marginBottom: '10px', width: '50%' }}
          size="small"
          type={isShowPasswordOld ? 'text' : 'password'}
          // onChange={(e) => checkPassword(e.target.value)}
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
      </div>
    )
  );
}

export default PasswordProfile;
