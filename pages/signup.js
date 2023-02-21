import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../app/auth/authActions";
import { object, string, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import styles from "../styles/Login.module.css";

function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const schema = object().shape({
    email: string().email().required("Email is required"),
    password: string().min(8).max(15).required("Password is required"),
    confirmPassword: string()
      .oneOf([ref("password"), null])
      .required("Passwords must match"),
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
      <TextField
        className={styles.inpuField}
        name="confirmPassword"
        error={!!errors.confirmPassword}
        label="Confirm Password"
        {...register("confirmPassword")}
        helperText={
          errors.confirmPassword ? errors.confirmPassword.message : ""
        }
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
        Sign Up
      </Button>
    </form>
  );
}

export default Signup;
