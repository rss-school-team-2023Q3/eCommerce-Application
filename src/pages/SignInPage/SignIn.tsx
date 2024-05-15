import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, IconButton, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect, useState } from 'react';
import './SignIn.modules.css';
import { NavLink } from 'react-router-dom';
import { ApiBuilder } from 'shared/libs/commercetools/apiBuilder';
// import { tokenCache } from 'shared/libs/commercetools/tokenCache';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setValid] = useState(false);
  const [user, setUser] = useState({
    email,
    password,
  });
  const [isShowPassword, setShowPassword] = useState(false);
  const emailRegexp = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const passwordRegexp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validate = (regexp: RegExp, inputValue: string) => {
    if (regexp.test(inputValue)) {
      setValid(true);

      return true;
    }

    setValid(false);

    return false;
  };

  const submitLogInData = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (isValid) {
      setUser({
        email,
        password,
      });

      const data = user;

      await new ApiBuilder().loginUser(email, password);
      // TODO: access to tokens
      // const tokensObject = tokenCache.get();
      // console.log(tokensObject);

      return data;
    }

    return true;
  };

  useEffect(() => {
    validate(emailRegexp, email);
    validate(passwordRegexp, password);
  }, [password, email]);

  return (
    <div className="login-wrapper">
      <form className="login-form" action="registration">
        <TextField
          autoComplete="off"
          type="email"
          style={{ marginBottom: '10px' }}
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="email"
          label="Email"
        />
        <TextField
          autoComplete="off"
          style={{ marginBottom: '10px' }}
          value={password}
          type={isShowPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          required
          id="password"
          label="Password"
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
          color={isValid ? 'primary' : 'error'}
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
