import { createSlice } from "@reduxjs/toolkit";

const authState = {
  token: [],
  user: [],
  error: {},
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    setToken: (state, action) => {
      console.log("Setting Token");
      state.token.push(action.payload);
    },
    setError: (state, action) => {
      console.log("Setting Error");
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.error = action.payload;
      console.log("Loading " + state.error);
    },
    loadUser: (state, action) => {
      state.user.push(action.payload);
      console.log("User " + JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = [];
      console.log("User is logged out " + state.user);
    },
  },
});

// this is for dispatch
export const { setToken, setError, setLoading, loadUser, logout } =
  authSlice.actions;

// this is for configureStore
export default authSlice.reducer;
