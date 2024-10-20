import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";
const baseUrl = import.meta.env.VITE_BASE_URL;
export const checkOut = createAsyncThunk(
  "product/payment",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/order/payment`, data, {
        withCredentials: true,
      });
      console.log(response.data.order);
      return response.data.order;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const paymentVerify = createAsyncThunk(
  "product/paymentVerify",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseUrl}/order/payment/verification`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
const checkOutSlice = createSlice({
  name: "checkOut",
  initialState: {
    products: [],
  },
  extraReducers: (builder) => {
    builder.addCase(checkOut.fulfilled, (state, action) => {});
    builder.addCase(paymentVerify.fulfilled, (state, action) => {});
  },
  reducers: {
    setCheckOutProducts: (state, action) => {
      state.products = action.payload;
    },
    updateProductQuantityOfCheckOut: (state, action) => {
      const product = state.products.find((product) => {
        console.log(product);
        console.log(action.payload);
        return product.product._id === action.payload.id;
      });
      product.quantity = action.payload.quantity.quantity;
      console.log(product);
    },
    deleteFromChekout: (state, action) => {
      state.products = state.products.filter((product) => {
        return product.product._id !== action.payload.id;
      }, console.log(action.payload.id));
    },
  },
});
export const {
  setCheckOutProducts,
  updateProductQuantityOfCheckOut,
  deleteFromChekout,
} = checkOutSlice.actions;
export default checkOutSlice.reducer;
