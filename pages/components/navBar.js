import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/NavBar.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { setDarkMode, setSideBar } from "../../app/ui/uiSlice";

import logo from "../../public/logo.jpg";
import { useRouter } from "next/router";
import Image from "next/image";
import useAuth from "../../app/hooks/useAuth";

export default function NavBar({ dark, setDark }) {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const sideBar = useSelector((state) => state.ui.sideBar);
  console.log("sidebar: " + sideBar);
  const { isAuth } = useAuth();
  console.log("isAuth: " + JSON.stringify(isAuth));

  const handleDarkModeOnchange = () => {
    setDark((prev) => !prev);
    dispatch(setDarkMode(dark));
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute">
        <Toolbar className={styles.toolbar}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => dispatch(setSideBar(!sideBar))}
          >
            <MenuIcon />
          </IconButton>
          <Box className={styles.logo}>
            <Image src={logo} alt="logo" onClick={() => router.push("/")} />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Clean City
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={dark}
                  onChange={() => handleDarkModeOnchange()}
                  inputProps={{ "aria-label": "controlled" }}
                  color="secondary"
                />
              }
              label={dark ? "dark" : "light"}
            />
          </FormGroup>
          {isAuth ? (
            <Link href="/logout">
              <a>Logout</a>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <a>Login</a>
              </Link>
              <Link href="/signup">
                <a>Signup</a>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
