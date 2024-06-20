import { Cart } from '@commercetools/platform-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { cart: Cart | null } = {
  cart: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (preState, action: PayloadAction<{ cart: Cart | null }>) => {
      const state = preState;

      state.cart = action.payload.cart;
    },
  },
});

const cartReducer = cartSlice.reducer;

export const { setCart } = cartSlice.actions;

export default cartReducer;
