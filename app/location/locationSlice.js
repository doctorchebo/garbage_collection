import { createSlice } from "@reduxjs/toolkit";

const locationState = {
  locations: [],
};

export const locationSlice = createSlice({
  name: "locations",
  initialState: locationState,
  reducers: {
    addMyLocations: (state, action) => {
      state.locations.push(action.payload);
    },
  },
});

// this is for dispatch
export const { addMyLocations } = locationSlice.actions;

// this is for configureStore
export default locationSlice.reducer;
