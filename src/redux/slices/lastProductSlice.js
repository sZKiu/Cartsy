import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  amount: 0,
};

export const lastProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLastProduct: (state, action) => {
      state.name = action.payload.name;
      state.amount = action.payload.amount;
    },
  },
});

export const { setLastProduct } = lastProductSlice.actions;

export default lastProductSlice.reducer;
