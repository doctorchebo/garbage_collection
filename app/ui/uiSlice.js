import { createSlice } from "@reduxjs/toolkit";

const uiState = {
  sideBar: false,
  dark: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: uiState,
  reducers: {
    setSideBar: (state, action) => {
      state.sideBar = action.payload;
    },
    setDarkMode: (state, action) => {
      state.dark = action.payload;
    },
  },
});

// this is for dispatch
export const { setSideBar, setDarkMode } = uiSlice.actions;

// this is for configureStore
export default uiSlice.reducer;
