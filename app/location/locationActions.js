import axios from "axios";
import React from "react";
import { locationsAPI } from "../../pages/components/axiosClient";

const SAVE_LOCATION = "SAVE_LOCATION";

function addMyLocations(location) {
  return {
    type: SAVE_LOCATION,
    payload: location,
  };
}

export function fetchMyLocations() {
  return async function fetchLocationsThunk(dispatch, getState) {
    const response = await locationsAPI.get("mylocations");
    dispatch(addMyLocations(response));
  };
}

export default addMyLocations;
