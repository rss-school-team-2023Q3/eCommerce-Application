import isLoggedIn from 'constants/isLogedIn';

import RoutePropsType from 'pages/App/types/RoutePropsType';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line max-len
function RestrictedRoute({ component: Component, redirectTo = '/' }: RoutePropsType) {
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
}

export default RestrictedRoute;
