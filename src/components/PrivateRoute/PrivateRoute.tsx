import isLoggedIn from 'constants/isLogedIn';

import RoutePropsType from 'interfaces/RoutePropsType';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line max-len
function PrivateRoute({ component: Component, redirectTo = '/' }: RoutePropsType) {
  return !isLoggedIn ? <Navigate to={redirectTo} /> : Component;
}

export default PrivateRoute;
