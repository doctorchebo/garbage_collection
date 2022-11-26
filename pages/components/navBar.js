import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

export default function NavBar({ sideBar, setSideBar, dark, setDark }) {
  console.log("dark in navbar" + dark);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute">
        <Toolbar>
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

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
