import { Customer } from '@commercetools/platform-sdk';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, IconButton, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IUser from 'pages/App/types/interfaces/IUser';
import { useEffect, useState } from 'react';
import './SignIn.modules.css';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setCredentials } from 'shared/api/authApi/store/authSlice';
import { ApiBuilder } from 'shared/libs/commercetools/apiBuilder';
import { tokenCache } from 'shared/libs/commercetools/tokenCache';
import { toastError } from 'shared/utils/notifications';
import validate from 'shared/utils/validate';

function SignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setEmailValid] = useState(true);
  const [isShowPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isFormValid, setFormValid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const navigate = useNavigate();

  const submitLogInData = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let resp;

    if (isEmailValid && isPasswordValid) {
      try {
        resp = await new ApiBuilder().loginUser(email, password);
        const tokensObject = tokenCache.get();

        if (tokensObject.refreshToken) {
          const customer: Customer | undefined = resp?.body.customer;

          if (
            customer
            && 'email' in customer
            && 'firstName' in customer
            && 'lastName' in customer
          ) {
            if (
              typeof customer.firstName === 'string'
              && typeof customer.lastName === 'string'
            ) {
              const user: IUser = {
                email: customer.email,
                firstName: customer.firstName,
                lastName: customer.lastName,
              };

              dispatch(setCredentials({ token: tokensObject.token, user }));
            }
          }
        }

        // TODO: access to tokens
        // const tokensObject = tokenCache.get();
        // console.log(tokensObject);
      } catch (error) {
        if (error instanceof Error) {
          toastError(error.message);
        }
      }
    }

    return resp;
  };

  function validateForm() {
    setFormValid(isEmailValid && isPasswordValid);
  }

  function validatePassword(value: string) {
    setPassword(value);
    setPasswordValid(!validate('password', value));
    setPasswordErrorMessage(validate('password', value));
  }

  function validateEmail(value: string) {
    setEmail(value);
    setEmailValid(!validate('email', value));
    setEmailErrorMessage(validate('email', value));
  }

  useEffect(() => {
    validateForm();
  }, [password, email]);

  return (
    <div className="login-wrapper">
      <form className="login-form" action="registration">
        <TextField
          autoComplete="off"
          type="text"
          style={{ marginBottom: '10px' }}
          required
          onChange={(e) => validateEmail(e.target.value)}
          value={email}
          helperText={isEmailValid ? '' : emailErrorMessage}
          FormHelperTextProps={{
            sx: {
              color: 'red',
            },
          }}
          id="email"
          label="Email"
          color={isEmailValid ? 'primary' : 'error'}
        />
        <TextField
          autoComplete="off"
          style={{ marginBottom: '10px' }}
          value={password}
          type={isShowPassword ? 'text' : 'password'}
          onChange={(e) => validatePassword(e.target.value)}
          required
          id="password"
          label="Password"
          color={isPasswordValid ? 'primary' : 'error'}
          helperText={isPasswordValid ? '' : passwordErrorMessage}
          FormHelperTextProps={{
            sx: {
              color: 'red',
            },
          }}
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
        <Button
          variant="contained"
          color={isFormValid ? 'primary' : 'error'}
          onClick={submitLogInData}
        >
          Sign In
        </Button>
      </form>
      <div>
        <NavLink className="login-link" to="/signup">
          Don&apos;t have an account? Sign Up
        </NavLink>
      </div>
    </div>
  );
}

export default SignIn;
