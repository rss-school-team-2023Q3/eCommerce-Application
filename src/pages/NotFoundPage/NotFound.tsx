import { Button, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';

import Image from './assets/NotFound.svg';

export default function NotFound() {
  return (
    <Container
      style={{ background: `url(${Image}) center no-repeat`, height: '92vh' }}
    >
      <NavLink to="/main">
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3, py: 2, px: 4 }}
        >
          Return Home
        </Button>
      </NavLink>
    </Container>
  );
}
