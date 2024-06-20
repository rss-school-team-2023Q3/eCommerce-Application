import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IProductData from 'pages/App/types/interfaces/IProductData';

const initialState: { products: IProductData[] } = {
  products: [],
  // map: new Map<IProductData, number>();
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProductData>) => {
      state.products.push(action.payload);
    },

    removeProduct: (preState, action: PayloadAction<IProductData>) => {
      const state = preState;

      state.products = state.products.filter((item) => item !== action.payload);
    },

    // setNumbers: (state, action: PayloadAction<>) => {
    //   state.map.set()
    // }
  },
});

const productReducer = productSlice.reducer;

export const { addProduct, removeProduct } = productSlice.actions;

export default productReducer;
