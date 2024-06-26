import { Cart } from '@commercetools/platform-sdk';
import CloseIcon from '@mui/icons-material/Close';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Toolbar, Button, Tooltip, Container, Badge,
} from '@mui/material';
import {
  Drawer, IconButton, useMediaQuery, useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Navigation.modules.css';
import { RootState } from 'shared/api/store';
import DeadBasket from 'shared/components/DeadBasket/DeadBasket';

export default function Navigation() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:992px)');

  const cartStore: Cart | null = useSelector(
    (state: RootState) => state.cart.cart,
  );

  function getCountItems() {
    let count = 0;

    cartStore?.lineItems.map((item) => {
      count += item.quantity;

      return true;
    });

    return count;
  }

  const countItems = getCountItems();

  const handleDrawerToggle = () => {
    setMobileOpen(!isMobileOpen);
  };

  const drawer = (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#1976d2',
        height: '100%',
      }}
    >
      <IconButton
        sx={{
          width: 'fit-content',
          alignSelf: 'center',
          margin: '10px 0 20px',
          color: '#fff',
        }}
        onClick={handleDrawerToggle}
      >
        <CloseIcon />
      </IconButton>
      <NavLink to="/main">
        {' '}
        <Button
          startIcon={<HomeIcon sx={{ width: '24px' }} />}
          className="nav-button"
          variant="outlined"
          sx={{ color: 'white' }}
          onClick={handleDrawerToggle}
        >
          <span>Home</span>
        </Button>
      </NavLink>
      <NavLink to="/catalog">
        <Tooltip title="Catalog">
          <Button
            startIcon={<FormatListBulletedIcon sx={{ width: '24px' }} />}
            className="nav-button"
            sx={{ color: 'white' }}
            variant="outlined"
            onClick={handleDrawerToggle}
          >
            <span>Catalog</span>
          </Button>
        </Tooltip>
      </NavLink>
      <NavLink to="/basket">
        <Tooltip title="Basket">
          <Button
            startIcon={(
              <Badge
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                badgeContent={countItems}
                color="primary"
              >
                <DeadBasket className={countItems ? 'shake-rotate' : ''} />
              </Badge>
            )}
            className="nav-button"
            sx={{ color: 'white' }}
            variant="outlined"
            onClick={handleDrawerToggle}
          >
            <span>Basket</span>
          </Button>
        </Tooltip>
      </NavLink>
      <NavLink to="/about-us">
        {' '}
        <Button
          startIcon={<GroupsOutlinedIcon sx={{ width: '24px' }} />}
          className="nav-button"
          sx={{ color: 'white' }}
          variant="outlined"
          onClick={handleDrawerToggle}
        >
          <span>Team</span>
        </Button>
      </NavLink>
      {isLoggedIn ? (
        <NavLink to="/profile">
          <Tooltip title="Profile">
            <Button
              sx={{ color: 'white' }}
              className="nav-button"
              startIcon={<ManageAccountsIcon sx={{ width: '24px' }} />}
              variant="outlined"
              onClick={handleDrawerToggle}
            >
              <span>Profile</span>
            </Button>
          </Tooltip>
        </NavLink>
      ) : null}
    </Container>
  );

  return (
    <Toolbar>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={isMobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </>
      ) : (
        <>
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
                startIcon={(
                  <Badge
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    badgeContent={countItems}
                    color="primary"
                  >
                    <DeadBasket className={countItems ? 'shake-rotate' : ''} />
                  </Badge>
                )}
                className="nav-button"
                sx={{ color: 'white' }}
                variant="outlined"
              >
                <span className="button-text">Basket</span>
              </Button>
            </Tooltip>
          </NavLink>
          <NavLink to="/about-us">
            <Tooltip title="Our Team">
              <Button
                startIcon={<GroupsOutlinedIcon />}
                className="nav-button"
                sx={{ color: 'white' }}
                variant="outlined"
              >
                <span className="button-text">Team</span>
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
        </>
      )}
    </Toolbar>
  );
}
