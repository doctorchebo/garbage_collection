import AxiosService, { authAPI } from "../../pages/components/axiosClient";
import {
  loadUser,
  setError,
  setLoading,
  setToken,
  logout,
  setSignup,
  setLoginSuccess,
} from "./authSlice";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    try {
      authAPI
        .post("token/", credentials)
        .then((response) => {
          localStorage.setItem("userDetails", JSON.stringify(response.data));
          dispatch(setToken(response.data));
        })
        .then((response) => {
          dispatch(setLoading(false));
          const user = JSON.parse(localStorage.getItem("userDetails")).access;
          dispatch(loadUser(jwt_decode(user)));
          dispatch(setLoginSuccess(true));
        })
        .catch((error) => {
          setError(error);
        });
    } catch (error) {
      setError(error);
    }
  };
};

export const signup = (credentials) => {
  return (dispatch) => {
    try {
      authAPI
        .post("signup/", credentials)
        .then((response) => {
          console.log(response.data);
          dispatch(setSignup(true));
        })
        .catch((error) => {
          dispatch(setError(error));
        });
    } catch (error) {
      dispatch(setError(error));
    }
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
