import { configureStore } from '@reduxjs/toolkit';

import authReducer from 'shared/api/authApi/store/authSlice';

import cartReducer from 'shared/api/cartApi/cartSlice';
import productsReduce from 'shared/api/productsApi/store/productSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReduce,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
