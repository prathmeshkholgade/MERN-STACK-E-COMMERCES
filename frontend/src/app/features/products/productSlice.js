import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const loadProducts = createAsyncThunk(
  "product/load",
  async (data, thunkAPI) => {
    try {
      const res = await axios.get(`${baseUrl}/product`, {
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
export const addReview = createAsyncThunk(
  "product/addReview",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/review/${id}`, data, {
        withCredentials: true,
      });
      await thunkAPI.dispatch(fetchSigleProduct(id));
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);
export const fetchSigleProduct = createAsyncThunk(
  "product/sigleProduct",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${baseUrl}/product/${id}`, {
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
export const fetchSigleProductForEdit = createAsyncThunk(
  "product/sigleProductForEdit",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${baseUrl}/product/${id}`, {
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

export const createProduct = createAsyncThunk(
  "product/add",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/product/add`, data, {
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
export const updateProduct = createAsyncThunk(
  "product/updateproduct",
  async ({ id, data }, thunkAPI) => {
    console.log("edit data", data);
    try {
      const res = await axios.put(`${baseUrl}/product/edit/${id}`, data, {
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

const initialState = {
  products: [],
  product: null,
  similarProducts: null,
  loading: null,
  error: null,
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = true;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchSigleProduct.fulfilled, (state, action) => {
        state.product = action.payload.product;
        state.similarProducts = action.payload.similarProduct;
      })
      .addCase(fetchSigleProductForEdit.fulfilled, (state, action) => {})
      .addCase(updateProduct.fulfilled, (state, action) => {});
  },
});

export default productSlice.reducer;
