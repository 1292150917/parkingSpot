import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Select, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import NewMap from "../../component/NewMap";
import xhr from "../../fetch";
import "./index.scss";
import { useEffect } from "react";

const ariaLabel = { "aria-label": "description" };
export default function TemporaryDrawer(props) {
  const [imgs, setImgs] = useState([]);
  const handleFileChange = event => {
    const file = event.target.files[0];
    // TODO: 处理上传逻辑
    const formData = new FormData();
    formData.append("file", file);
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(response => {
        var newImg = imgs;
        newImg.push(response.data);
        event.target.value = "";
        setImgs(JSON.parse(JSON.stringify(newImg)));
      });
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price_per_day, setPricePerDay] = useState("");
  const [price_per_hour, setPricePerHour] = useState("");
  const [address, setAddress] = useState("");
  const [standard, setStandard] = useState("");
  const [addressNum, setAddressNum] = useState({});

  useEffect(() => {
    setDescription(!props.msg ? "" : props.msg.description);
    setName(!props.msg ? "" : props.msg.name);
    setPricePerDay(!props.msg ? "" : props.msg.price_per_day);
    setPricePerHour(!props.msg ? "" : props.msg.price_per_hour);
    setAddress(!props.msg ? "" : props.msg.address);
    setStandard(!props.msg ? "" : props.msg.standard);
    setImgs(!props.msg ? [] : props.msg.images.split(","));
  }, [props.msg]);

  const mapClick = res => {
    setAddressNum(res);
  };

  const addOrUpdate = res => {
    let data = {
      name,
      description,
      price_per_day,
      price_per_hour,
      address,
      standard,
    };
    data.user_id = JSON.parse(sessionStorage.userInfo)?.id;
    var mew_img = JSON.parse(JSON.stringify(imgs));
    data.images = mew_img.join(",");
    data.visible = 1;
    data.latitude = addressNum.lat;
    data.longitude = addressNum.lng;

    if (props.msg) {
      xhr(
        "/parking/" + props.msg.id,
        {
          method: "PUT",
          body: JSON.stringify(data),
        },
        res => {
          if (res.code === "200") {
            alert("修改成功");
            props.setOpen(false);
          }
        }
      );
      return;
    }

    xhr(
      "/parking",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      res => {
        if (res.code === "200") {
          alert("创建成功");
          props.setOpen(false);
        }
      }
    );
  };
  return (
    <div>
      <Drawer anchor={"right"} open={props.open}>
        <div className="drawer">
          <div>
            <div className="drawer-item">
              <span>Name</span>
              <Input
                value={name}
                disabled={props.disabled}
                onChange={e => setName(e.target.value)}
                multiline
                inputProps={ariaLabel}
              />
            </div>
            <div className="drawer-item">
              <span>Description</span>
              <Input
                disabled={props.disabled}
                value={description}
                onChange={e => setDescription(e.target.value)}
                multiline
                inputProps={ariaLabel}
              />
            </div>
            <div className="drawer-item" style={{ display: "flex" }}>
              <span>图片</span>
              {!props.disabled && (
                <div style={{ overflow: "hidden" }}>
                  <div className="upload-container">
                    <span
                      className="plus"
                      onClick={() =>
                        document.querySelector('input[type="file"]').click()
                      }
                    >
                      +
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="img-map">
              {imgs.map(item => (
                <div>
                  <img style={{ height: "120px" }} src={item}></img>
                </div>
              ))}
            </div>
            <div className="drawer-item">
              <span>Price per day</span>
              <Input
              disabled={props.disabled}
                value={price_per_day}
                onChange={e => setPricePerDay(e.target.value)}
                multiline
                inputProps={{
                  pattern: "[0-9]*",
                  inputMode: "numeric",
                }}
              />
            </div>
            <div className="drawer-item">
              <span>Price per hour</span>
              <Input
                value={price_per_hour}
                disabled={props.disabled}
                onChange={e => setPricePerHour(e.target.value)}
                multiline
                inputProps={{
                  pattern: "[0-9]*",
                  inputMode: "numeric",
                }}
              />
            </div>
            <div className="drawer-item">
              <span>Address</span>
              <Input
                value={address}
                disabled={props.disabled}
                onChange={e => setAddress(e.target.value)}
                multiline
                inputProps={ariaLabel}
              />
            </div>
            <div className="drawer-item" style={{ display: "flex" }}>
              <span>地图标记</span>
              <div>
                {addressNum.lat}, {addressNum.lng}{" "}
              </div>
            </div>
            <NewMap onClick={mapClick}></NewMap>
            <div className="drawer-item">
              <span>可停放类型</span>
              <Select
              disabled={props.disabled}
                variant="outlined"
                value={standard}
                onChange={e => setStandard(e.target.value)}
              >
                <MenuItem value="option1">SUV</MenuItem>
                <MenuItem value="option2">轿车</MenuItem>
                <MenuItem value="option3">puv</MenuItem>
                <MenuItem value="option3">越野</MenuItem>
              </Select>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button variant="contained" onClick={() => props.setOpen(false)}>
              取消
            </Button>
            {!props.disabled && (
              <Button
                style={{ marginLeft: "10px" }}
                onClick={() => addOrUpdate()}
                variant="contained"
              >
                {props.msg ? "修改" : "新增"}
              </Button>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
