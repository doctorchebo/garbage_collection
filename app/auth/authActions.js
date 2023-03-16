import AxiosService, { authAPI } from "../../pages/components/axiosClient";
import {
  loadUser,
  setError,
  setLoading,
  setToken,
  logout,
  setSignup,
  setLoginSuccess,
  setIsAuth,
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
          const user = JSON.parse(localStorage.getItem("userDetails")).access;
          dispatch(loadUser(jwt_decode(user)));
          dispatch(setLoginSuccess(true));
          dispatch(setLoading(false));
          dispatch(setIsAuth(true));
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
    dispatch(setLoading(true));
    try {
      authAPI
        .post("signup/", credentials)
        .then((response) => {
          console.log(response.data);
          dispatch(setSignup(true));
          dispatch(setLoading(false));
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
      dispatch(setIsAuth(false));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
