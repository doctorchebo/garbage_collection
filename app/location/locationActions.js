import axios from "axios";
import React from "react";
import { setError, setHasError } from "../auth/authSlice";
import {
  addLocation,
  setSaveLocationFailure,
  setSaveLocationSuccess,
} from "./locationSlice";
import AxiosService, { locationsAPI } from "../../pages/components/axiosClient";
export function fetchMyLocations() {
  return async function fetchLocationsThunk(dispatch, getState) {
    const response = await locationsAPI.get("mylocations");
    dispatch(addMyLocations(response));
  };
}

export const saveLocation = (coordinates) => {
  return (dispatch) => {
    try {
      console.log("coordinates: " + JSON.stringify(coordinates));
      locationsAPI
        .post("add-location", coordinates)
        .then((response) => {
          if (response != undefined) {
            dispatch(addLocation(JSON.stringify(response)));
            dispatch(setSaveLocationSuccess(true));
          } else {
            dispatch(setHasError(true));
          }
        })
        .catch((error) => {
          dispatch(setError(error.message));
          dispatch(setHasError(true));
        });
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
