import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IAuthState from 'pages/App/types/interfaces/IAuthState';
import IUser from 'pages/App/types/interfaces/IUser';
import { tokenCache } from 'shared/libs/commercetools/tokenCache';

const initialState: IAuthState = {
  token: tokenCache.get().token,
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
    },
    logout: (preState) => {
      const state = preState;

      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const authReducer = authSlice.reducer;

export const { setCredentials, logout } = authSlice.actions;

export default authReducer;
