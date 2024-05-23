import HomeIcon from '@mui/icons-material/Home';
import { Toolbar, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <Toolbar>
      <NavLink to="/main">
        <Button
          startIcon={<HomeIcon />}
          sx={{ color: 'white' }}
          variant="outlined"
        >
          Home
        </Button>
      </NavLink>

      {/* {isLoggedIn && (
        <NavLink to="/products">
          <MUI.Button
            startIcon={<RecentActorsIcon />}
            sx={{ color: 'white' }}
            variant="outlined"
          >
            Products
          </MUI.Button>
        </NavLink>
      )} */}
    </Toolbar>
  );
}
