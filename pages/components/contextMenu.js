import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveLocation } from "../../app/location/locationActions";

export default function ContextMenu({ contextMenu, setContextMenu }) {
  const selectedLocation = useSelector(
    (state) => state.locations.selectedLocation
  );
  const dispatch = useDispatch();
  console.log("contextMenu =>" + contextMenu);
  const handleClose = () => {
    setContextMenu(null);
  };

  const handleSaveLocation = () => {
    dispatch(saveLocation(selectedLocation));
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
      <MenuItem onClick={() => handleSaveLocation()}>
        Save Marker Location
      </MenuItem>
      <MenuItem onClick={handleClose}>Share</MenuItem>
      <MenuItem onClick={handleClose}>I cleaned this place!</MenuItem>
    </Menu>
  );
}
