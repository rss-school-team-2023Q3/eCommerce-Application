import { Cart } from '@commercetools/platform-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { cart: Cart | null } = {
  // products: [],
  // map: new Map<IProductData, number>();
  cart: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (preState, action: PayloadAction<{ cart: Cart }>) => {
      const state = preState;

      state.cart = action.payload.cart;
    },

    // removeProduct: (preState, action: PayloadAction<IProductData>) => {
    // const state = preState;

    // state.cart = state.cart.filter((item) => item !== action.payload);
  },

  // setNumbers: (state, action: PayloadAction<>) => {
  //   state.map.set()
  // }
});

const cartReducer = cartSlice.reducer;

export const { setCart } = cartSlice.actions;

export default cartReducer;
