import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useEffect, useState } from "react";
import { formLabelClasses } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSideBar } from "../../app/ui/uiSlice";
import { LocationOn } from "@mui/icons-material";
import { useRouter } from "next/router";

export default function SideBar() {
  const sideBar = useSelector((state) => state.ui.sideBar);
  const dispatch = useDispatch();
  const router = useRouter();
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    dispatch(setSideBar(open));
  };

  const handleMenuClick = (index) => {
    console.log("index: " + index);
    switch (index) {
      case 0:
        router.push("/my-locations");
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["My locations", "Events", "Configuration"].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleMenuClick(index)}>
              <ListItemIcon>
                <LocationOn />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={"left"}>
          <Drawer anchor={"left"} open={sideBar} onClose={toggleDrawer(false)}>
            {list("left")}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
