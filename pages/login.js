import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { login } from "../app/auth/authActions";
import styles from "../styles/Login.module.css";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const schema = object().shape({
    email: string().email().required("Email is required"),
    password: string().required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user.length) {
      router.push("/");
    }
  }, [user, router]);

  const onSubmit = (data) => {
    dispatch(login(data));
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
        Login
      </Button>
    </form>
  );
};

export default Login;
