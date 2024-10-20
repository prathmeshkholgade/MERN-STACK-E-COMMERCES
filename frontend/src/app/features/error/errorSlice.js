import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    error: false,
    message: null,
  },
  reducers: {
    addErrorMessage: (state, action) => {
      state.message = action.payload;
      state.error = true;
    },
    clearErrorMessage: (state, action) => {
      state.message = "";
      state.error = false;
    },
  },
});
export const { addErrorMessage, clearErrorMessage } = errorSlice.actions;
export default errorSlice.reducer;
