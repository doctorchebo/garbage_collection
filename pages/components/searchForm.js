import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Search } from "@mui/icons-material";
function SearchForm() {
  const [zoom, setZoom] = useState(3);
  const [location, setLocation] = useState(null);
  console.log("Zoom =>" + zoom);
  console.log("Location =>" + location);
  return (
    <Box
      maxWidth="650px"
      component="form"
      m={2}
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      style={{
        zIndex: 10,
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "rgba(255,255,255,1)",
      }}
    >
      <TextField
        sx={{ m: 1 }}
        label="Location"
        id="outlined-size-small"
        size="small"
        onChange={(e) => setLocation(e.target.value)}
      />
      <TextField
        sx={{ m: 1 }}
        label="Zoom"
        id="outlined-size-small"
        size="small"
        onChange={(e) => setZoom(e.target.value)}
      />
      <Button sx={{ m: 1 }} variant="outlined" startIcon={<Search />}>
        Search
      </Button>
      <Button
        disabled
        sx={{ m: 1 }}
        variant="outlined"
        startIcon={<FileUploadOutlinedIcon />}
      >
        Add photo
      </Button>
    </Box>
  );
}

export default SearchForm;
