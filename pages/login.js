import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { login, setToken } from "../app/auth/authActions";
import styles from "../styles/Login.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const schema = object().shape({
    email: string().required("Email is required"),
    password: string().required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    validationSchema: schema,
  });
  const onSubmit = (data) => {
    dispatch(login(data));
    console.log("token =>" + JSON.stringify(state));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
      <TextField
        className={styles.inpuField}
        name="email"
        error={!!errors.email}
        label="Email"
        helperText={errors.email ? errors.email.message : ""}
        type="email"
        {...register("email")}
        fullWidth
      />
      <TextField
        className={styles.inpuField}
        name="password"
        error={!!errors.password}
        label="Password"
        {...register("password")}
        helperText={errors.password ? errors.password.message : ""}
        type="password"
        fullWidth
      />

      <Button
        className={styles.submitButton}
        color="primary"
        type="submit"
        variant="contained"
        fullWidth
      >
        Submit
      </Button>
    </form>
  );
};

export default Login;
