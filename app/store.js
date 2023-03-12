import { configureStore } from "@reduxjs/toolkit";
import locationsReducer from "./location/locationSlice";
import authReducer from "../app/auth/authSlice";
import uiReducer from "../app/ui/uiSlice";

export default configureStore({
  reducer: {
    locations: locationsReducer,
    auth: authReducer,
    ui: uiReducer,
  },
});
