import React from "react";
import {
  useJsApiLoader,
  GoogleMap,
  useLoadScript,
  MarkerF,
} from "@react-google-maps/api";
import { useMemo } from "react";
import { Box } from "@mui/material";
import styles from "../../styles/Map.module.css";
function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
  });
  const center = useMemo(() => ({ lat: -17.783257, lng: -63.182164 }), []);

  if (!isLoaded) {
    return <Box>Loading...</Box>;
  }
  return (
    <GoogleMap zoom={15} center={center} mapContainerClassName={styles.map}>
      <MarkerF position={center} />
    </GoogleMap>
  );
}

export default Map;
