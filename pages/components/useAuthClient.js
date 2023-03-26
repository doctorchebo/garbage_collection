import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../../app/auth/authSlice";

const useAuthClient = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  return axios
    .create({
      baseURL: `${baseUrl}/auth/`,
      method: "POST",
      withCredentials: true,
    })
    .interceptors.request.use(
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
    )
    .interceptors.response.use(
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
                    dispatch(setIsAuth(false));
                    Promise.reject(error);
                    removeTokens();
                    router.push("/login");
                  });
              };
            }
          } else if (error.response.status === 403) {
          }
        }
      }
    );
};

const removeTokens = () => {
  localStorage.removeItem("userDetails");
};

export default useAuthClient;
