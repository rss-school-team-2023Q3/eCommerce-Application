import { Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import './Main.modules.css';
import { RootState } from 'shared/api/store';
import PromoCodeComponent from 'shared/components/PromoCodeComponent/PromoCodeComponent';

export default function Main() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <>
      <Navigate to="/main" />
      <Typography className="page-title" variant="h2">
        Main page
      </Typography>
      <PromoCodeComponent />
      <Paper className="main-links" elevation={24}>
        <NavLink color="second" className="login-link" to="/catalog">
          Catalog
        </NavLink>
        {isLoggedIn && (
          <NavLink className="login-link" to="/profile">
            Profile
          </NavLink>
        )}
        {!isLoggedIn && (
          <>
            <NavLink className="login-link" to="/signup">
              Sign Up
            </NavLink>
            <NavLink className="login-link" to="/signin">
              Sign In
            </NavLink>
          </>
        )}
        <NavLink className="login-link" to="/about-us">
          About us
        </NavLink>
        <NavLink className="login-link" to="/signininin">
          404
        </NavLink>
      </Paper>
    </>
  );
}
