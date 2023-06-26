import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader, InfoWindow } from "@react-google-maps/api";
import Card from "./Card";
import CardList from "./CardList";
import fetch from "../../fetch";
import "./index.scss";
import moment from "moment";

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371;

  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const lat1Rad = deg2rad(lat1);
  const lat2Rad = deg2rad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

const containerStyle = {
  width: "100%",
  height: "calc(100%)",
};

const searchParams = new URLSearchParams(window.location.search);
const queryLng = searchParams.get("lng"); // 'John'
const queryLat = searchParams.get("lat"); // 'John'
function MyComponent(props) {
  const { visibleLeft = true } = props;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA-Tm0Wf5xc4QvSEcoy43Hc1l_JlESU3fk",
  });

  const [map, setMap] = useState(null);
  const [isItem, setIsItem] = useState(false);
  const [message, setMessage] = useState(null);
  const [time, setTime] = useState(null);
  const [querylgs, setQuerylgs] = useState(null);

  const [locations, setLocations] = useState([]);

  const [center, setCenter] = useState(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCenter({ lat, lng });
      });
    }
    return {};
  });

  useEffect(()=>{
    if(!message){
      return
    }
    setCenter({
      lat: Number(message.lat),
      lng: Number(message.lng),
    })
  },[message])

  useEffect(() => {
    const now = moment();
    const formattedTime = now.format("YYYY-MM-DD HH:mm:ss");
    const sevenDaysLater = now.add(7, "days");
    setTime({
      startTime: formattedTime,
      endTime: sevenDaysLater.format("YYYY-MM-DD HH:mm:ss"),
    });
  }, []);

  useEffect(() => {
    var url = "/parking?";
    if (time && time.endTime) {
      url += `start_time=${moment(time.startTime).format(
        "YYYY-MM-DD HH:mm:ss"
      )}&end_time=${moment(time.endTime).format("YYYY-MM-DD HH:mm:ss")}`;
    }
    fetch(url, {}, res => {
      const data = res.data.map(item => ({
        lat: Number(item.latitude),
        lng: Number(item.longitude),
        ...item,
        images: item.images.split(","),
      }));
      let newData = data.map(location => ({
        ...location,
        km: getDistanceFromLatLonInKm(
          location.latitude,
          location.longitude,
          center.lat,
          center.lng
        ).toFixed(2),
      }));
      newData = newData.sort((a, b) => Number(a.km) - Number(b.km));
      setLocations(newData);
    });
  }, [time]);
  function handleInfoWindowLoad(infoWindow) {
    setTimeout(() => {
      var a = document.querySelectorAll(".gm-style-iw-a");
      Array.from(a).map(item => {
        item.style.display = "block";
      });
      if (queryLat) {
        setCenter({
          lat: Number(queryLat),
          lng: Number(queryLng),
        });
      }
    }, 300);
  }
  const onLoad = useCallback(function callback(map) {
    setMap(map);
    setIsCard(true);
  }, []);

  const [isCard, setIsCard] = useState(false);

  return isLoaded ? (
    <div
      className="map"
      style={{ height: visibleLeft ? "calc(100% - 50px)" : "calc(100%)" }}
    >
      <div className="google-msg">
        {isCard && visibleLeft ? (
          <CardList
            setTime={setTime}
            card={locations}
            setCenter={setCenter}
            setMessage={setMessage}
            onClick={location => {
              setIsItem(true);
            }}
          />
        ) : null}
      </div>
      <div style={{ height: "100%" }}>
        {center.lat && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
          >
            {locations.map((location, index) =>
              location.lat && location.lng && location.price_per_day ? (
                <InfoWindow
                  key={index}
                  onLoad={handleInfoWindowLoad}
                  position={{ lat: location.lat, lng: location.lng }}
                >
                  <div
                    style={{
                      cursor: "pointer",
                      width: "50px",
                      fontWeight: 800,
                      textAlign: "center",
                    }}
                    onClick={() => {
                      setMessage(location);
                      setIsItem(true);
                    }}
                  >
                    ${location.price_per_day}/day
                  </div>
                </InfoWindow>
              ) : null
            )}
          </GoogleMap>
        )}
      </div>
    </div>
  ) : null;
}

export default React.memo(MyComponent);
