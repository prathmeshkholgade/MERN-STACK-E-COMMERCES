import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";
export const store = configureStore({
  reducer: {
    Product: productReducer,
    Auth: authReducer,
    Cart: cartReducer,
  },
});
