import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";
import checkOutReducers from "../features/order/checkOutSlice";
import errorReducers from "../features/error/errorSlice";
import orderReducers from "../features/order/orderSlice";
export const store = configureStore({
  reducer: {
    Product: productReducer,
    Auth: authReducer,
    Cart: cartReducer,
    CheckOut: checkOutReducers,
    Error: errorReducers,
    Order: orderReducers,
  },
});
