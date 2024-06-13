import { Cart } from '@commercetools/platform-sdk';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {
  Toolbar, Button, Tooltip, Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Navigation.modules.css';
import { RootState } from 'shared/api/store';

export default function Navigation() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const cartStore: Cart | null = useSelector(
    (state: RootState) => state.cart.cart,
  );

  const countItems = cartStore?.lineItems.length;

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
      <NavLink to="/basket">
        <Tooltip title="Basket">
          <Button
            startIcon={<ShoppingBasketIcon />}
            className="nav-button"
            sx={{ color: 'white' }}
            variant="outlined"
          >
            <span className="button-text">Basket</span>
            <Typography sx={{ mt: '3px' }}>{countItems}</Typography>
          </Button>
        </Tooltip>
      </NavLink>
      {isLoggedIn ? (
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
      ) : (
        ''
      )}
    </Toolbar>
  );
}
