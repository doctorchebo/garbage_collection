import {
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { login } from "../app/auth/authActions";
import styles from "../styles/Login.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { setError } from "../app/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const { user, error } = useSelector((state) => state.auth);
  console.log("error: " + error);
  const schema = object().shape({
    email: string().email().required("Email is required"),
    password: string().required("Password is required"),
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
    if (user.length) {
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    dispatch(setError(false));
  }, [dispatch]);

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
        id="outlined-adornment-password"
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
      <Button
        className={styles.submitButton}
        color="primary"
        type="submit"
        variant="contained"
        fullWidth
      >
        Login
      </Button>
      {error && (
        <div className={styles.error}>Incorrect email and/or password</div>
      )}
    </form>
  );
};

export default Login;
