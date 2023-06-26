import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Card from "./Card";
import Datetime from "react-datetime";
import AutoComplete from "react-google-autocomplete";
import DirectionsIcon from "@mui/icons-material/Directions";
import "./cardList.scss";
import "react-datetime/css/react-datetime.css";
const searchParams = new URLSearchParams(window.location.search);
const cradId = searchParams.get("id"); // 'John'
export default function RecipeReviewCard(props) {
  const [visible, setVisible] = React.useState(true);
  const [message, setMessage] = React.useState(null);
  const [isItem, setIsItem] = React.useState(false);
  const [startTime, setStartTime] = React.useState(false);
  const [endTime, setEndTime] = React.useState(false);
  const [center, setCenter] = React.useState(null);

  React.useEffect(() => {
    props.setMessage && props.setMessage(message);
  }, [message]);

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (endTime && startTime) {
        props.setTime({
          endTime,
          startTime,
        });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [startTime, endTime]);

  React.useEffect(() => {
    if (props.card && props.card.length) {
      var item = props.card.filter(item => item.id == cradId);
      //  && setMessage(item[0]) && setVisible(true)
      if (item && item[0]) {
        setMessage(item[0]);
        setIsItem(true);
      }
    }
  }, [props.card]);
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const onPlaceSelected = res => {
    if (res.geometry && res.geometry.location && res.geometry.location.lng) {
      setCenter({
        lng: res.geometry.location.lng(),
        lat: res.geometry.location.lat(),
      });
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <div>
        <div className="card-search">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              marginBottom: "4px",
            }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <MenuIcon onClick={() => setVisible(val => !val)} />
            </IconButton>
            <AutoComplete
              className="location-search"
              onPlaceSelected={onPlaceSelected}
              apiKey="AIzaSyA-Tm0Wf5xc4QvSEcoy43Hc1l_JlESU3fk"
              fields={["address_components", "geometry.location"]}
            />
            <IconButton
              onClick={() => center ? props.setCenter(center) : ''}
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              onClick={() =>
                window.open("https://www.google.com/maps/?hl=zh-CN")
              }
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
            >
              <DirectionsIcon />
            </IconButton>
          </Paper>
          {visible && <p>可以通过时间进行搜索</p>}
          {visible && (
            <div className="card-search-date-time">
              <div>
                <span>start time</span>
                {/* <Datetime
                  isValidDate={validityCheck}
                  showTimeSelect
                  timeFormat="HH:mm"
                /> */}
                <input
                  defaultValue={new Date().toISOString().split(".")[0]}
                  min={new Date().toISOString().split(".")[0]}
                  onChange={event => setStartTime(event.target.value)}
                  type="datetime-local"
                />
              </div>
              <div>
                <span>end time</span>
                {/* <Datetime  minDate={minDate} timeFormat="HH:mm" /> */}
                <input
                  defaultValue={nextWeek.toISOString().slice(0, 16)}
                  min={new Date().toISOString().split(".")[0]}
                  onChange={event => setEndTime(event.target.value)}
                  type="datetime-local"
                />
              </div>
            </div>
          )}
        </div>
        {visible && (
          <div className="card-list">
            {props.card.map(item => (
              <div
                className="card-list-item"
                onClick={() => [
                  setMessage(item),
                  setIsItem(true),
                  props.onClick(res => !res),
                ]}
              >
                <img src={item.images?.[0]} alt="" />
                <div>
                  <p>{item.name}</p>
                  <p>{item.description}</p>
                  <p>
                    ${item.price_per_day}/day ${item.price_per_hour}/hour
                  </p>
                  <p>{item.km + "km"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isItem && (
        <div style={{ width: "400px", overflow: "auto", height: "795px" }}>
          <Card clear={() => setIsItem(false)} message={message} />
        </div>
      )}
    </div>
  );
}
