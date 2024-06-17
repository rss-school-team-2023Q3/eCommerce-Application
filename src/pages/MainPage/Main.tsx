import { Paper, Typography } from '@mui/material';
import { NavLink, Navigate } from 'react-router-dom';
import './Main.modules.css';

export default function Main() {
  return (
    <>
      <Navigate to="/main" />
      <Typography className="page-title" variant="h2">
        Main page
      </Typography>
      <Paper className="main-links">
        <NavLink color="second" className="login-link" to="/catalog">
          Catalog
        </NavLink>
        <NavLink className="login-link" to="/profile">
          Profile
        </NavLink>
        <NavLink className="login-link" to="/signup">
          Sign Up
        </NavLink>
        <NavLink className="login-link" to="/signininin">
          404
        </NavLink>
      </Paper>
    </>
  );
}
