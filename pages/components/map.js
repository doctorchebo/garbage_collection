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
import SearchForm from "./searchForm";
import NavBar from "./navBar";
import SideBar from "./sideBar";
function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
    libraries: ["places"],
  });
  const [selected, setSelected] = useState(null);
  const [sideBar, setSideBar] = useState(false);

  if (!isLoaded) {
    return <Box>Loading...</Box>;
  }
  return (
    <>
      <NavBar sideBar={sideBar} setSideBar={setSideBar} />
      <SideBar sideBar={sideBar} setSideBar={setSideBar} />
      <div className={styles.placesContainer}>
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
      {/* <SearchForm setZoom={setZoom} /> */}
      <GoogleMap zoom={15} center={selected} mapContainerClassName={styles.map}>
        {selected && <MarkerF position={selected} />}
      </GoogleMap>
    </>
  );
}

export default Map;
