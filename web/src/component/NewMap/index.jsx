import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
const MapWithMarker = (props = { onClick: Function, lng: "", lat: "" }) => {
  const initialMarker = {
    lat: null,
    lng: null,
  };

  const [marker, setMarker] = useState(initialMarker);

  let center = {
    lat: props.lat || 37.7749,
    lng: props.lng || -122.4194,
  };

  useEffect(() => {
    props.onClick(marker);
  }, [marker]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA-Tm0Wf5xc4QvSEcoy43Hc1l_JlESU3fk",
  });

  const handleMapClick = event => {
    setMarker({
      lat: props.lat || event.latLng.lat(),
      lng: props.lng || event.latLng.lng(),
    });
  };

  const handleMarkerClick = () => {
    setMarker(initialMarker);
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      onClick={handleMapClick}
    >
      {marker.lat && marker.lng && (
        <Marker
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={handleMarkerClick}
        />
      )}
    </GoogleMap>
  );
};

export default MapWithMarker;
