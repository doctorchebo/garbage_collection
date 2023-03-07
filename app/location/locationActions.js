import axios from "axios";
import React from "react";
import { setError } from "../auth/authSlice";
import { addLocation } from "./locationSlice";
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
          dispatch(addLocation(JSON.stringify(response)));
        })
        .then(() => {
          console.log("saved succesfully");
        })
        .catch((error) => {
          dispatch(setError(error));
        });
    } catch (error) {
      dispatch(setError(error));
    }
  };
};
