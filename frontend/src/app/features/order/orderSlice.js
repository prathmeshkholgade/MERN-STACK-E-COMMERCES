import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const fetchAllOrders = createAsyncThunk(
  "product/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${baseUrl}/order`, {
        withCredentials: true,
      });
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);
export const getUserOrdersInDetails = createAsyncThunk(
  "product/userOrder",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/order/${id}`, {
        withCredentials: true,
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
const orderSlice = createSlice({
  name: "Order",
  initialState: {
    AllOrders: [],
    orderDetails: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.AllOrders = action.payload;
      })
      .addCase(getUserOrdersInDetails.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
      });
  },
});

export default orderSlice.reducer;
