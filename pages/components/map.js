import React, { useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  useLoadScript,
  MarkerF,
} from "@react-google-maps/api";
import { useMemo } from "react";
import { Box } from "@mui/material";
import styles from "../../styles/Map.module.css";
import PlacesAutocomplete from "./placesAutocomplete";
function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
    libraries: ["places"],
  });
  const [selected, setSelected] = useState(null);
  const center = useMemo(() => ({ lat: -17.783257, lng: -63.182164 }), []);

  if (!isLoaded) {
    return <Box>Loading...</Box>;
  }
  return (
    <>
      <div className={styles.placesContainer}>
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
      <GoogleMap zoom={15} center={center} mapContainerClassName={styles.map}>
        {selected && <MarkerF position={selected} />}
      </GoogleMap>
    </>
  );
}

export default Map;
