import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { logoutUser } from "../auth/authSlice";

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

export const deleteFromCart = createAsyncThunk(
  "user/deletecart",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`${baseUrl}/cart/${id}`, {
        withCredentials: true,
      });
      thunkAPI.dispatch(fetchUserCart());
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
export const updateProductQuantity = createAsyncThunk(
  "user/updateProductQunatity",
  async ({ id, quantity }, thunkAPI) => {
    try {
      const res = await axios.put(`${baseUrl}/cart/${id}`, quantity, {
        withCredentials: true,
      });
      thunkAPI.dispatch(fetchUserCart());
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
      .addCase(addToCart.fulfilled, (state, action) => {})
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        const productId = action.meta.arg;
        // Immediately remove the product from the state by filtering it out
        state.Cart.items = state.Cart.items.filter(
          (item) => item.product._id !== productId
        );
        if (state.Cart.items.length === 0) {
          state.Cart = null;
        }
      })
      .addCase(updateProductQuantity.fulfilled, (state, action) => {});
    // .addCase(logoutUser.fulfilled, (state) => (state.Cart = null));
  },
});

export default cartSlice.reducer;
