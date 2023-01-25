import { configureStore } from "@reduxjs/toolkit";
import locationsReducer from "./location/locationSlice";
import authReducer from "../app/auth/authSlice";

export default configureStore({
  reducer: {
    locations: locationsReducer,
    auth: authReducer,
  },
});
