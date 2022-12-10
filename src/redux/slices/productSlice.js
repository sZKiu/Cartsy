import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      const product = {};
      product.name = action.payload.name;
      product.price = action.payload.price;
      product.img = action.payload.cover;
      product.amount = action.payload.amount;
      state.push(product);
    },
    setIncreaseAmount: (state, action) => {
      state.forEach((el, ind) => {
        if (el.name === action.payload.name) {
          el.amount += 1;
        }
      });
    },
    setDecreaseAmount: (state, action) => {
      state.forEach((el, ind) => {
        if (el.name === action.payload.name) {
          el.amount -= 1;
        }
      });
    },
    setDeleteProduct: (state, action) => {
      let pos;
      state.forEach((el, ind) => {
        if (el.name === action.payload.name) {
          pos = ind;
        }
      });
      state.splice(pos, 1);
    },
    setCleanAll: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const {
  setProduct,
  setIncreaseAmount,
  setDecreaseAmount,
  setDeleteProduct,
  setCleanAll,
} = productSlice.actions;

export default productSlice.reducer;
