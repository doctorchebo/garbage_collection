import React, { useCallback, useRef, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  useLoadScript,
  MarkerF,
  MarkerClusterer,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useMemo } from "react";
import { Box } from "@mui/material";
import styles from "../../styles/Map.module.css";
import PlacesAutocomplete from "./placesAutocomplete";
import SearchForm from "./searchForm";
import NavBar from "./navBar";
import SideBar from "./sideBar";
import Distance from "./distance";
import { Combobox, ComboboxButton } from "@reach/combobox";
function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
    libraries: ["places"],
  });
  const [selected, setSelected] = useState(null);
  const [sideBar, setSideBar] = useState(false);
  const [directions, setDirections] = useState(null);

  const randomLocations = useMemo(
    () => generateLocations(selected),
    [selected]
  );

  const options = useMemo(
    () => ({
      mapId: "60597b3810980490",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const onMarkerDragEnd = (event) => {
    console.log("Called");
    console.log(event);
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelected({ lat, lng });
  };
  const getDirections = (house) => {
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: selected,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          console.log("result");
          console.log(result);
          setDirections(result);
        }
      }
    );
  };
  const clearDirections = () => {
    setDirections();
  };
  const saveMarker = (event) => {
    console.log(event);
    console.log("Save marker");
  };
  if (!isLoaded) {
    return <Box>Loading...</Box>;
  }
  return (
    <>
      <NavBar sideBar={sideBar} setSideBar={setSideBar} />
      <SideBar sideBar={sideBar} setSideBar={setSideBar} />
      <div className={styles.placesContainer}>
        {!selected && <p>Look for a place to clean</p>}
        {directions && <Distance leg={directions.routes[0].legs[0]} />}
        <PlacesAutocomplete
          setSelected={(pos) => {
            setSelected(pos);
            mapRef.current.panTo(pos);
          }}
        />
        {directions && (
          <Combobox>
            <ComboboxButton onClick={() => clearDirections()}>
              Clean
            </ComboboxButton>
          </Combobox>
        )}
      </div>
      {/* <SearchForm setZoom={setZoom} /> */}
      <GoogleMap
        zoom={15}
        center={selected}
        mapContainerClassName={styles.map}
        options={options}
        onLoad={onLoad}
        clickable={true}
        onClick={saveMarker}
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeWeight: 5,
                strokeColor: "#74DC4D",
                zIndex: 50,
              },
            }}
          />
        )}
        {selected && (
          <>
            <MarkerF
              position={selected}
              icon="/b.png"
              draggable={true}
              onDragEnd={onMarkerDragEnd}
              clickable={true}
            />
            <MarkerClusterer>
              {(clusterer) =>
                randomLocations.map((house) => (
                  <MarkerF
                    key={house.lat}
                    position={house}
                    clusterer={clusterer}
                    onClick={() => getDirections(house)}
                  />
                ))
              }
            </MarkerClusterer>
          </>
        )}
      </GoogleMap>
    </>
  );
}

export default Map;

const generateLocations = (position) => {
  const randomLocations = [];
  for (let i = 0; i < 20; i++) {
    const direction = Math.random() < 0.5 ? -50 : 50;
    randomLocations.push({
      lat: position?.lat + Math.random() / direction,
      lng: position?.lng + Math.random() / direction,
    });
  }
  return randomLocations;
};
