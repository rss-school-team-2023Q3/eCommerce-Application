import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <h2>Not found</h2>
      <NavLink to="/main">
        <Button variant="contained" color={'primary'}>
          Go home
        </Button>
      </NavLink>
    </>
  );
}
