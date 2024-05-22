import RoutePropsType from 'pages/App/types/types/RoutePropsType';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from 'shared/api/authApi/store/store';

function PrivateRoute({
  component: Component,
  redirectTo = '/',
}: RoutePropsType) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return !isLoggedIn ? <Navigate to={redirectTo} /> : Component;
}

export default PrivateRoute;
