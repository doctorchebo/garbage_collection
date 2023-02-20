import AxiosService from "../../pages/components/axiosClient";
import { loadUser, setError, setLoading, setToken, logout } from "./authSlice";
import jwt_decode from "jwt-decode";

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    try {
      AxiosService.authAPI()
        .post("token/", credentials)
        .then((response) => {
          localStorage.setItem("userDetails", JSON.stringify(response.data));
          dispatch(setToken(response.data));
        })
        .then((response) => {
          dispatch(setLoading(false));
          const user = JSON.parse(localStorage.getItem("userDetails")).access;
          dispatch(loadUser(jwt_decode(user)));
        })
        .catch((error) => {
          setError(error.message);
        });
    } catch (error) {
      setError(error.message);
    }
  };
};

export const signup = (credentials) => {
  return (dispatch) => {
    try {
    } catch (error) {}
  };
};

export const LogoutUser = () => {
  return (dispatch) => {
    try {
      localStorage.removeItem("userDetails");
      dispatch(logout());
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
