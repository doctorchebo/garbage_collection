import axios from "axios";
import { setError, setHasError } from "../../app/auth/authSlice";
const baseUrl = "http://127.0.0.1:8000";

export const locationsAPI = axios.create({
  baseURL: `${baseUrl}/locations/`,
});

locationsAPI.interceptors.request.use(
  (config) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails) {
      config.headers["Authorization"] = `Bearer ${userDetails.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

locationsAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const config = error?.config;
    if (error.response) {
      if (error.response.status === 401 && !config?.sent) {
        console.log(
          "access token expired, using refresh token to get new access token"
        );
        config.sent = true;
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        if (userDetails != null) {
          return async (dispatch) => {
            return authAPI
              .post("token/refresh/", userDetails.refresh)
              .then((res) => {
                config.headers["Authorization"] = `Bearer ${res.access}`;
                localStorage.setItem("userDetails", res.access);
                console.log("new access token was saved");
                return axios(config);
              })
              .catch((error) => {
                dispatch(setError(error));
                dispatch(setHasError(true));
                Promise.reject(error);
                removeTokens();
              });
          };
        }
      } else if (error.response.status === 403) {
      }
    }
  }
);

export const authAPI = axios.create({
  baseURL: `${baseUrl}/auth/`,
  method: "POST",
  withCredentials: true,
});

export const usersAPI = axios.create({
  baseURL: `${baseUrl}/users/`,
});
