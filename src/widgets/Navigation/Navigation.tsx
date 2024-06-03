import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Toolbar, Button, Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './Navigation.modules.css';

export default function Navigation() {
  return (
    <Toolbar>
      <NavLink to="/main">
        <Tooltip title="Home">
          <Button
            startIcon={<HomeIcon />}
            className="nav-button"
            variant="outlined"
            sx={{ color: 'white' }}
          >
            <span className="button-text">Home</span>
          </Button>
        </Tooltip>
      </NavLink>

      <NavLink to="/catalog">
        <Tooltip title="Catalog">
          <Button
            startIcon={<FormatListBulletedIcon />}
            className="nav-button"
            sx={{ color: 'white' }}
            variant="outlined"
          >
            <span className="button-text">Catalog</span>
          </Button>
        </Tooltip>
      </NavLink>
      <NavLink to="/profile">
        <Tooltip title="Profile">
          <Button
            sx={{ color: 'white' }}
            className="nav-button"
            startIcon={<ManageAccountsIcon />}
            variant="outlined"
          >
            <span className="button-text">Profile</span>
          </Button>
        </Tooltip>
      </NavLink>
    </Toolbar>
  );
}
