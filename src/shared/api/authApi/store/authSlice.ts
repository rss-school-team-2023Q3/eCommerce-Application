import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IAuthState from 'pages/App/types/interfaces/IAuthState';
import IUser from 'pages/App/types/interfaces/IUser';

const initialState: IAuthState = {
  token: localStorage.getItem('tokenGG'),
  isLoggedIn: false,
  user: JSON.parse(localStorage.getItem('userGG')!),
};

if (initialState.token) {
  initialState.isLoggedIn = true;
}

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
      localStorage.setItem('tokenGG', state.token);
      localStorage.setItem('userGG', JSON.stringify(state.user));
    },
    logout: (preState) => {
      const state = preState;

      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem('tokenGG');
      localStorage.removeItem('userGG');
    },
  },
});

const authReducer = authSlice.reducer;

export const { setCredentials, logout } = authSlice.actions;

export default authReducer;
