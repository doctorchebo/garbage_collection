import axios from "axios";
import React from "react";
import { setError, setHasError, setLoading } from "../auth/authSlice";
import {
  addLocation,
  setMyLocations,
  setSaveLocationFailure,
  setSaveLocationSuccess,
} from "./locationSlice";
import AxiosService, { locationsAPI } from "../../pages/components/axiosClient";
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
export const fetchMyLocations = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    try {
      locationsAPI
        .get("my-locations")
        .then((response) => {
          dispatch(setMyLocations(response.data));
          dispatch(setLoading(false));
        })
        .catch((error) => {
          dispatch(setError(error.message));
        });
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};

