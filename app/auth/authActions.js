import { getStepLabelUtilityClass } from "@mui/material";
import { authAPI } from "../../pages/components/axiosClient";

const SAVE_TOKEN = "SAVE_TOKEN";

function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    payload: token,
  };
}

export function login(credentials) {
  return async function fetchLocationsThunk(dispatch, getState) {
    try {
      const response = await authAPI.post("token/", credentials);
      dispatch(saveToken(response.data));
      console.log(getState());
    } catch (error) {
      if (error.response) {
        console.log(error);
      }
    }
  };
}

export default saveToken;
