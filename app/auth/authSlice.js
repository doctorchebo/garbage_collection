import { createSlice } from "@reduxjs/toolkit";

const authState = {
  user: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    saveToken: (state, action) => {
      state.user.push(action.payload);
    },
  },
});

// this is for dispatch
export const { saveToken } = authSlice.actions;

// this is for configureStore
export default authSlice.reducer;
