import { createSlice } from "@reduxjs/toolkit";

const locationState = {
  locations: [],
  name: {},
  selectedLocation: [],
  saveLocationSuccess: false,
  saveLocationFailure: false,
  myLocations: [],
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
    setName: (state, action) => {
      let results = action.payload;
      for (let i = 0; i < results.length; i++) {
        if (!results[i].formatted_address.includes("GV")) {
          state.name = results[i].formatted_address;
          break;
        }
      }
    },
    setMyLocations: (state, action) => {
      state.myLocations = action.payload;
    },
  },
});

// this is for dispatch
export const {
  addLocation,
  setSelectedLocation,
  setSaveLocationSuccess,
  setSaveLocationFailure,
  setName,
  setMyLocations,
} = locationSlice.actions;

// this is for configureStore
export default locationSlice.reducer;
