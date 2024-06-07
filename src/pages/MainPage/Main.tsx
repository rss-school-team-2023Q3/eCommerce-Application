import { NavLink, Navigate } from 'react-router-dom';
import './Main.modules.css';

export default function Main() {
  return (
    <>
      <Navigate to="/main" />
      <h2>Main page</h2>
      <div className="main-links">
        <NavLink className="login-link" to="/catalog">
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
      </div>
    </>
  );
}
