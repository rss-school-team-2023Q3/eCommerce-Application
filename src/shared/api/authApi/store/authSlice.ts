import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IAuthState from 'pages/App/types/interfaces/IAuthState';
import IUser from 'pages/App/types/interfaces/IUser';

const initialState: IAuthState = {
  token: localStorage.getItem('token'),
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      preState,
      action: PayloadAction<{ token: string; user: IUser }>,
    ) => {
      const { token, user } = action.payload;
      const state = preState;

      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
      localStorage.setItem('token', token);
    },
    logout: (preState) => {
      const state = preState;

      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
  },
});

const authReducer = authSlice.reducer;

export const { setCredentials, logout } = authSlice.actions;

export default authReducer;
