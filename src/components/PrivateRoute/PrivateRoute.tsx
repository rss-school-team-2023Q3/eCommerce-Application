// import { useAuth } from 'hooks';
import isLoggedIn from 'constants/isLogedIn';

import React from 'react';
import { Navigate } from 'react-router-dom';

type RoutePropsType = { component: React.FC; redirectTo: string };

// eslint-disable-next-line max-len
function RestrictRoute({ component: Component, redirectTo = '/' }: RoutePropsType) {
  return !isLoggedIn ? <Navigate to={redirectTo} /> : Component;
}

export default RestrictRoute;
