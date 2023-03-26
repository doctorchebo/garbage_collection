import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyLocations } from "../app/location/locationActions";
import styles from "../styles/MyLocations.module.css";
import Location from "./components/location";
const MyLocations = () => {
  const { myLocations } = useSelector((state) => state.locations);
  const dispath = useDispatch();
  useEffect(() => {
    dispath(fetchMyLocations());
  }, [dispath]);
  return (
    <Box sx={{ flexGrow: 1 }} className={styles.container}>
      <Typography className={styles.title}>My Locations</Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {myLocations.map((location) => (
          <Grid item xs={2} sm={4} md={4} key={location.id}>
            <Location {...location} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyLocations;
