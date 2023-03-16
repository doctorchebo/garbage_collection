import { createSlice } from "@reduxjs/toolkit";

const authState = {
  token: [],
  user: [],
  error: {},
  isSignup: false,
  loading: false,
  loginSuccess: false,
  hasError: false,
  isAuth: false,
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
      state.error = action.payload;
      console.log("Setting Error: " + state.error);
    },
    setHasError: (state, action) => {
      state.hasError = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
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
    setSignup: (state, action) => {
      state.isSignup = action.payload;
      console.log("User is signed up: " + state.isSignup);
    },
    setLoginSuccess: (state, action) => {
      state.loginSuccess = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

// this is for dispatch
export const {
  setToken,
  setError,
  setHasError,
  setLoading,
  loadUser,
  logout,
  setSignup,
  setLoginSuccess,
  setIsAuth,
} = authSlice.actions;

// this is for configureStore
export default authSlice.reducer;
