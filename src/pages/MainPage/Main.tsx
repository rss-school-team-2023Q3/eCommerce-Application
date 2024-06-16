import { NavLink, Navigate } from 'react-router-dom';
import './Main.modules.css';
import PromoCodeComponent from 'shared/components/PromoCodeComponent/PromoCodeComponent';

export default function Main() {
  return (
    <>
      <Navigate to="/main" />
      <h2>Main page</h2>
      <PromoCodeComponent />
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
