import { createSlice } from "@reduxjs/toolkit";

const locationState = {
  locations: [],
  selectedLocation: [],
  saveLocationSuccess: false,
  saveLocationFailure: false,
};

export const locationSlice = createSlice({
  name: "locations",
  initialState: locationState,
  reducers: {
    addLocation: (state, action) => {
      state.locations.push(action.payload);
    },
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    setSaveLocationSuccess: (state, action) => {
      state.saveLocationSuccess = action.payload;
    },
    setSaveLocationFailure: (state, action) => {
      state.saveLocationFailure = action.payload;
    },
  },
});

// this is for dispatch
export const {
  addLocation,
  setSelectedLocation,
  setSaveLocationSuccess,
  setSaveLocationFailure,
} = locationSlice.actions;

// this is for configureStore
export default locationSlice.reducer;
