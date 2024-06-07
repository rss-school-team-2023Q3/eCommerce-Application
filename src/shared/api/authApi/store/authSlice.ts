import { Customer } from '@commercetools/platform-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IAuthState from 'pages/App/types/interfaces/IAuthState';

const initialState: IAuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (preState, action: PayloadAction<{ user: Customer }>) => {
      const { user } = action.payload;
      const state = preState;

      state.user = user;
      state.isLoggedIn = true;
    },
    logout: (preState) => {
      const state = preState;

      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem('tokenCacheGG');
    },
  },
});

const authReducer = authSlice.reducer;

export const { setCredentials, logout } = authSlice.actions;

export default authReducer;
