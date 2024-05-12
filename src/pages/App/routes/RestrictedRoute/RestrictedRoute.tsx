import RoutePropsType from 'pages/App/types/RoutePropsType';
import { Navigate } from 'react-router-dom';
import isLoggedIn from 'shared/constants/isLogedIn';

function RestrictedRoute({
  component: Component,
  redirectTo = '/',
}: RoutePropsType) {
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
}

export default RestrictedRoute;
