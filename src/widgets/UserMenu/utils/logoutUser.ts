import { Dispatch } from '@reduxjs/toolkit';
import { logout } from 'shared/api/authApi/store/authSlice';

export default async function logoutUser(dispatch: Dispatch) {
  dispatch(logout());
}
