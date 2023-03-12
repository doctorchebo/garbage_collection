import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../app/auth/authActions";
import { object, string, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import styles from "../styles/Login.module.css";
import { setSignup } from "../app/auth/authSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isSignup, error } = useSelector((state) => state.auth);
  const schema = object().shape({
    email: string().email().required("Email is required"),
    password: string().min(8).max(15).required("Password is required"),
    confirmPassword: string()
      .required("Confirm password is required")
      .oneOf([ref("password")], "Your passwords do not match."),
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isSignup) {
      router.push("signup-success/");
      dispatch(setSignup(false));
    }
  }, [isSignup, dispatch, router]);

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    dispatch(signup(data));
    if (Object.keys(error).length !== 0) {
      alert(error.response?.data?.message);
      dispatch(setError({}));
    }
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
        type={showPassword ? "text" : "password"}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
        type={showPassword ? "text" : "password"}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
