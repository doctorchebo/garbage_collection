import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import styles from "../styles/Login.module.css";

const Login = () => {
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
    alert(JSON.stringify(data));
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
