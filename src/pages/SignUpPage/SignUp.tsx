import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  TextField, InputAdornment, IconButton, Button,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AdressForm from 'shared/components/AdressForm';
import DateInput from 'shared/components/DateInput';
import './SignUp.modules.css';

function SignUp() {
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
          size="small"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="email"
          label="Email"
        />
        <TextField
          autoComplete="off"
          type="Text"
          style={{ marginBottom: '10px' }}
          required
          size="small"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="first_name"
          label="First Name"
        />
        <TextField
          autoComplete="off"
          type="Text"
          style={{ marginBottom: '10px' }}
          required
          size="small"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="last_name"
          label="Last Name"
        />
        <DateInput />
        <TextField
          autoComplete="off"
          style={{ marginBottom: '10px' }}
          value={password}
          size="small"
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
        <AdressForm />
        <Button
          variant="contained"
          color={isValid ? 'primary' : 'error'}
          onClick={submitLogInData}
        >
          Sign In
        </Button>
      </form>
      <div>
        <NavLink className="login-link" to="/signin">
          Already have an account? Sign In
        </NavLink>
      </div>
    </div>
  );
}

export default SignUp;
