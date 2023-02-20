import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "../../styles/NavBar.module.css";

export default function NavBar({ sideBar, setSideBar, dark, setDark }) {
  const user = useSelector((state) => state.auth.user);
  console.log("dark in navbar" + dark);
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
            onClick={() => setSideBar(!sideBar)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Garbage Collection App - By Chebo
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={dark}
                  onChange={() => setDark((prev) => !prev)}
                  inputProps={{ "aria-label": "controlled" }}
                  color="secondary"
                />
              }
              label={dark ? "light" : "dark"}
            />
          </FormGroup>
          {user.length ? (
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
