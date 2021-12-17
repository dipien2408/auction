import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
    },
    reset(state) {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
