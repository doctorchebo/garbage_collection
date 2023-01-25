import { authAPI } from "../../pages/components/axiosClient";

const SAVE_TOKEN = "SAVE_TOKEN";

function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    payload: token,
  };
}

export function login() {
  return async function fetchLocationsThunk(dispatch, getState) {
    const response = await authAPI.post("token", {
      email: "marcelo.munoz.coaquira@gmail.com",
      password: "Jirafita0210",
    });
    dispatch(saveToken(response));
  };
}

export default saveToken;
