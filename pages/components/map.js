import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { Alert, AlertTitle, Box, Button, Fade } from "@mui/material";
import styles from "../../styles/Map.module.css";
import PlacesAutocomplete from "./placesAutocomplete";
import SearchForm from "./searchForm";
import NavBar from "./navBar";
import SideBar from "./sideBar";
import Distance from "./distance";
import { Combobox, ComboboxButton } from "@reach/combobox";
import SnackBar from "./snackBar";
import ContextMenu from "./contextMenu";
import { useDispatch, useSelector } from "react-redux";
import { saveLocation } from "../../app/location/locationActions";
import {
  setSaveLocationSuccess,
  setName,
  setSelectedLocation,
} from "../../app/location/locationSlice";
import { setError, setHasError } from "../../app/auth/authSlice";
import { LocationOn } from "@mui/icons-material";
import useGeocoder from "./geocoder";
function Map({ dark, setDark, sideBar, setSideBar }) {
  const [libraries] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
    libraries,
  });
  const [geocoder, setGeocoder] = useState(null);
  useEffect(() => {
    if (isLoaded) {
      const gc = new window.google.maps.Geocoder();
      setGeocoder(gc);
    }
  }, [isLoaded]);

  const hasError = useSelector((state) => state.auth.hasError);
  const { locationSavedSuccess, name } = useSelector(
    (state) => state.locations
  );
  const [selected, setSelected] = useState({
    lat: -16.499593804390177,
    lng: -68.12269880408721,
  });
  const [directions, setDirections] = useState(null);
  const [saveButton, setSaveButton] = useState(false);
  const [locations, setLocations] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const dispatch = useDispatch();
  console.log("selected address: " + JSON.stringify(name, null, 2));
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
    setIsSearch(false);
    const lat = parseFloat(event.latLng.lat());
    const lng = parseFloat(event.latLng.lng());
    setSelected({ lat, lng });
    getAddress(selected);
  };

  const getAddress = (location) => {
    geocoder
      .geocode({ location: location })
      .then((response) => {
        if (response.results[0]) {
          dispatch(setName(response.results));
        } else {
          window.alert("No results found");
        }
      })
      .then(()=>{
        dispatch(setSelectedLocation({ lat, lng, name }));
      })
      .catch((e) => console.log("Geocoder failed due to: " + e));
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
  const handleMapOnClick = (event) => {
    const lat = parseFloat(event.latLng.lat());
    const lng = parseFloat(event.latLng.lng());
    setIsSearch(false);
    setSelected({ lat, lng });
    getAddress(selected);
    setSaveButton(true);
  };

  const addLocation = () => {
    dispatch(saveLocation(selected));
    setLocations([...locations, selected]);
  };

  const handleContextMenu = (event) => {
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  if (!isLoaded) {
    return <Box>Loading...</Box>;
  }
  return (
    <>
      <div onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
        <SideBar />
        <div className={styles.placesContainer}>
          {directions && <Distance leg={directions.routes[0].legs[0]} />}
          {hasError && (
            <Fade
              in={hasError} //Write the needed condition here to make it appear
              timeout={{ enter: 1000, exit: 1000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
              addEndListener={() => {
                setTimeout(() => {
                  dispatch(setHasError(false));
                }, 2000);
              }}
            >
              <Alert severity="warning" variant="standard" className="alert">
                <AlertTitle>Fail</AlertTitle>
                Please login or create an accont to save locations
              </Alert>
            </Fade>
          )}
          {locationSavedSuccess && (
            <Fade
              in={locationSavedSuccess} //Write the needed condition here to make it appear
              timeout={{ enter: 1000, exit: 1000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
              addEndListener={() => {
                setTimeout(() => {
                  dispatch(setSaveLocationSuccess(false));
                }, 2000);
              }}
            >
              <Alert severity="success" variant="standard" className="alert">
                <AlertTitle>Success</AlertTitle>
                Saved Successfully!
              </Alert>
            </Fade>
          )}

          {selected && (
            <Button
              variant="contained"
              endIcon={<LocationOn />}
              onClick={() => addLocation()}
            >
              Save Location
            </Button>
          )}
          <PlacesAutocomplete
            setSelected={(pos) => {
              setIsSearch(true);
              setSelected(pos);
              dispatch(setSelectedLocation(pos));
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
          center={isSearch && selected}
          mapContainerClassName={styles.map}
          options={options}
          onLoad={onLoad}
          clickable={true}
          onClick={handleMapOnClick}
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
              <ContextMenu
                contextMenu={contextMenu}
                setContextMenu={setContextMenu}
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
        <SnackBar open={open} setOpen={setOpen} />
      </div>
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
