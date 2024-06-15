import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function AuthNav() {
  return (
    <div>
      <NavLink to="/signup">
        <Button
          startIcon={<HowToRegIcon />}
          sx={{ color: 'white', fontFamily: 'Montserrat, sans-serif' }}
          variant="outlined"
        >
          Register
        </Button>
      </NavLink>

      <NavLink to="/signin">
        <Button
          startIcon={<LoginIcon />}
          sx={{ color: 'white', fontFamily: 'Montserrat, sans-serif' }}
          variant="outlined"
        >
          LogIn
        </Button>
      </NavLink>
    </div>
  );
}
