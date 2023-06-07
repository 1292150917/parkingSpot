import React from "react";
import { GoogleMap, useJsApiLoader, InfoWindow } from "@react-google-maps/api";
import Card from "./Card";
import CardList from "./CardList";
import { useState } from "react";
const containerStyle = {
  width: "100%",
  height: "calc(100%)",
};

const locations = [
  { lat: 37.774788, lng: -122.431709, name: "车位1" },
  { lat: 37.786109, lng: -122.405985, name: "车位2" },
  { lat: 37.797669, lng: -122.414178, name: "车位3" },
];

const center = {
  lat: locations[0].lat,
  lng: locations[0].lng,
};
function MyComponent(props) {
  const { visibleLeft = true } = props;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA-Tm0Wf5xc4QvSEcoy43Hc1l_JlESU3fk",
  });

  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = React.useState(null);
  const [isItem, setIsItem] = useState(false);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
    setTimeout(() => {
      setIsCard(true);
    }, 0);
  }, []);

  const [isCard, setIsCard] = useState(false);
  const [message, setMessage] = useState("");

  return isLoaded ? (
    <div style={{ height: visibleLeft ? "calc(100% - 50px)" : "calc(100%)" }}>
      <div className="google-msg">
        {isCard && visibleLeft ? (
          isItem ? (
            <Card message={message} clear={() => setIsItem(false)} />
          ) : (
            <CardList setMessage={setMessage} onClick={() => setIsItem(true)} />
          )
        ) : (
          ""
        )}
      </div>
      <div style={{ height: "100%" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={onLoad}
        >
          {locations.map((location, index) => (
            <InfoWindow position={{ lat: location.lat, lng: location.lng }}>
              <div
                style={{ cursor: "pointer" }}
                onClick={(() => [setMessage(location), setIsItem(true)])}
              >
                {location.name}
              </div>
            </InfoWindow>
          ))}
        </GoogleMap>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
