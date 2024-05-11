import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import './SignIn.modules.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setValid] = useState(false);
  const [user, setUser] = useState({
    email,
    password,
  });
  const emailRegexp = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const passwordRegexp =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;
  const validate = (regexp: RegExp, inputValue: string) => {
    if (regexp.test(inputValue)) {
      setValid(true);

      return true;
    }

    setValid(false);

    return false;
  };

  const signUp = async (event: { preventDefault: () => void }) => {
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
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="email"
          label="Email"
        />
        <TextField
          autoComplete="off"
          style={{ marginBottom: '10px' }}
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          id="password"
          label="Password"
        />
        <Button
          variant="contained"
          color={isValid ? 'primary' : 'error'}
          onClick={signUp}
        >
          Sign In
        </Button>
      </form>
      <div>
        <a className="login-link" href="/sign_up">
          Don&apos;t have an account? Sign Up
        </a>
      </div>
    </div>
  );
}

export default SignIn;
