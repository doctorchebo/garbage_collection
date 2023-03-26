import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "../auth/authSlice";

export const useAuth = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (window !== undefined) {
      const isToken =
        localStorage.getItem("userDetails") != null ? true : false;
      dispatch(setIsAuth(isToken));
    }
  }, [dispatch]);

  return {
    isAuth,
  };
};

export default useAuth;
