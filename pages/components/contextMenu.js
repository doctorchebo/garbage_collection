import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function ContextMenu({ contextMenu, setContextMenu }) {
  console.log("contextMenu =>" + contextMenu);
  const handleClose = () => {
    setContextMenu(null);
  };
  return (
    <Menu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
    >
      <MenuItem onClick={handleClose}>Save Marker Location</MenuItem>
      <MenuItem onClick={handleClose}>Share</MenuItem>
      <MenuItem onClick={handleClose}>I cleaned this place!</MenuItem>
    </Menu>
  );
}
