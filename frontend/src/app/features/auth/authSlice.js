import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
const initialState = {
  User: null,
  isLoading: false,
  error: null,
};
export const loginUser = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/login`, data, {
        withCredentials: true,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const signupUser = createAsyncThunk(
  "user/signup",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/signup`, data, {
        withCredentials: true,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${baseUrl}/logout`, {
        withCredentials: true,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchCurrUser = createAsyncThunk(
  "user/fetchuser",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${baseUrl}/user`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addAddress = createAsyncThunk(
  "user/addAddress",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/address`, data, {
        withCredentials: true,
      });
      thunkAPI.dispatch(fetchCurrUser());
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateAddress = createAsyncThunk(
  "user/updateaddAddress",
  async ({ id, data }, thunkAPI) => {
    console.log(id, data);
    try {
      const res = await axios.put(`${baseUrl}/address/${id}`, data, {
        withCredentials: true,
      });
      thunkAPI.dispatch(fetchCurrUser());
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response || error.response.data);
    }
  }
);
export const deleteAddress = createAsyncThunk(
  "user/deleteAddress",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`${baseUrl}/address/${id}`, {
        withCredentials: true,
      });
      thunkAPI.dispatch(fetchCurrUser());
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.User = action.payload.user;
      })
      .addCase(fetchCurrUser.fulfilled, (state, action) => {
        state.User = action.payload.user;
      })
      .addCase(fetchCurrUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.User = action.payload.user;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.User = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {})
      .addCase(deleteAddress.fulfilled, (state, action) => {})
      .addCase(updateAddress.fulfilled, (state, action) => {});
  },
});

export default authSlice.reducer;
