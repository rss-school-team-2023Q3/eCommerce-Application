import { Button, Container, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

import Image from './assets/NotFound.svg';

export default function NotFound() {
  return (
    <Container
      style={{
        background: `url(${Image}) center no-repeat transparent`,
        height: '92vh',
      }}
    >
      <Typography className="page-title" variant="h2">
        Not Found
      </Typography>
      <NavLink to="/main">
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 1, py: 2, px: 4 }}
        >
          Return Home
        </Button>
      </NavLink>
    </Container>
  );
}
