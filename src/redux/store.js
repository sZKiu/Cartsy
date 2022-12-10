import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import lastProductSlice from "./slices/lastProductSlice";

export default configureStore({
  reducer: {
    product: productSlice,
    lastProduct: lastProductSlice,
  },
})