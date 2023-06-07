import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import Datetime from "react-datetime";
import DirectionsIcon from "@mui/icons-material/Directions";
import "./cardList.scss";
import "react-datetime/css/react-datetime.css";
export default function RecipeReviewCard(props) {
  const [visible, setVisible] = React.useState(true);
  return (
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
            <MenuIcon onClick={()=> setVisible(val => !val)} />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Google Maps"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
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
              start time
              <Datetime />
            </div>
            <div>
              end time
              <Datetime />
            </div>
          </div>
        )}
      </div>
      {visible && (
        <div className="card-list">
          <div className="card-list-item" onClick={props.onClick}>
            <img
              src="https://img1.baidu.com/it/u=2463514011,1142503686&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1686070800&t=e59f19e7d3db7e50651bf9e3491b1875"
              alt=""
            />
            <div>
              <p>我是名称</p>
              <p>
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx简介
              </p>
              <p>$90/day</p>
              <p>10km</p>
            </div>
          </div>
          <div onClick={props.onClick} className="card-list-item">
            <img
              src="https://img1.baidu.com/it/u=2463514011,1142503686&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1686070800&t=e59f19e7d3db7e50651bf9e3491b1875"
              alt=""
            />
            <div>
              <p>我是名称</p>
              <p>
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx简介
              </p>
              <p>$90/day</p>
              <p>10km</p>
            </div>
          </div>
          <div onClick={props.onClick} className="card-list-item">
            <img
              src="https://img1.baidu.com/it/u=2463514011,1142503686&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1686070800&t=e59f19e7d3db7e50651bf9e3491b1875"
              alt=""
            />
            <div>
              <p>我是名称</p>
              <p>
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx简介
              </p>
              <p>$90/day</p>
              <p>10km</p>
            </div>
          </div>
          <div onClick={props.onClick} className="card-list-item">
            <img
              src="https://img1.baidu.com/it/u=2463514011,1142503686&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1686070800&t=e59f19e7d3db7e50651bf9e3491b1875"
              alt=""
            />
            <div>
              <p>我是名称</p>
              <p>
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx简介
              </p>
              <p>$90/day</p>
              <p>10km</p>
            </div>
          </div>
          <div onClick={props.onClick} className="card-list-item">
            <img
              src="https://img1.baidu.com/it/u=2463514011,1142503686&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1686070800&t=e59f19e7d3db7e50651bf9e3491b1875"
              alt=""
            />
            <div>
              <p>我是名称</p>
              <p>
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx简介
              </p>
              <p>$90/day</p>
              <p>10km</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
