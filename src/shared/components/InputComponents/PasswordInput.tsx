import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import formContext from 'pages/SignUpPage/formContext';
import { useContext, useState } from 'react';
import validate from 'shared/utils/validate';

function PasswordInput() {
  const [isShowPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const formData = useContext(formContext);
  const regexp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  function checkPassword(pass: string) {
    setIsValid(validate(regexp, pass));

    if (validate(regexp, pass) && pass.length > 1) {
      formData.password.value = pass;
      formData.password.isValid = true;
    } else {
      formData.password.isValid = false;
    }
  }

  return (
    <TextField
      autoComplete="off"
      style={{ marginBottom: '10px' }}
      size="small"
      type={isShowPassword ? 'text' : 'password'}
      onChange={(e) => checkPassword(e.target.value)}
      required
      id="password"
      label="Password"
      helperText={
        isValid
          ? ''
          : 'Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number & 1 special character'
      }
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
              onClick={handleClickShowPassword}
              edge="end"
            >
              {isShowPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordInput;
