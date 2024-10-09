import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const fetchUserCart = createAsyncThunk(
  "user/cart",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${baseUrl}/cart`, { withCredentials: true });
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "user/addToCart",
  async ({ data }, thunkAPI) => {
    console.log(data);
    try {
      const res = await axios.post(`${baseUrl}/cart`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    Cart: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.Cart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {});
  },
});

export default cartSlice.reducer;
