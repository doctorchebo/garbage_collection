import React, { useEffect } from "react";

const useGeocoder = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, []);
  const geocoder = new window.google.maps.Geocoder();
  return geocoder;
};

export default useGeocoder;
