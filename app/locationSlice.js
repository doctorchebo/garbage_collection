import { createSlice } from "@reduxjs/toolkit";

const locationState = {
  locations: [],
};

export const locationSlice = createSlice({
  name: "todos",
  initialState: locationState,
  reducers: {
    addLocation: (state, action) => {
      state.locations.push(action.payload);
    },
  },
});

// this is for dispatch
export const { addLocation } = locationSlice.actions;

// this is for configureStore
export default locationSlice.reducer;
