import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Select, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import "./index.scss";

const ariaLabel = { "aria-label": "description" };
export default function TemporaryDrawer(props) {
  const handleFileChange = event => {
    const file = event.target.files[0];
    console.log(file);
    // TODO: 处理上传逻辑
  };
  const [numbervalue, numbersetValue] = useState("");
  const [value, setValue] = useState("");

  const handleChange = event => {
    setValue(event.target.value);
  };
  const numberChange = event => {
    const newValue = event.target.value.replace(/[^0-9]/g, "");
    numbersetValue(newValue);
  };
  return (
    <div>
      <Drawer anchor={"right"} open={props.open}>
        <div
          className="drawer"
        >
          <div>
            <div className="drawer-item">
              <span>name</span>
              <Input
                defaultValue="style"
                multiline
                inputProps={ariaLabel}
              />
            </div>
            <div className="drawer-item">
              <span>简介</span>
              <Input
                defaultValue="style"
                multiline
                inputProps={ariaLabel}
              />
            </div>
            <div className="drawer-item">
              <span>图片</span>
              <div style={{overflow: 'hidden'}}>
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
            </div>
            <div className="drawer-item">
              <span>价格/时</span>
              <Input
                multiline
                value={numbervalue}
                onChange={numberChange}
                inputProps={{
                  pattern: "[0-9]*",
                  inputMode: "numeric",
                }}
              />
            </div>
            <div className="drawer-item">
              <span>价格/天</span>
              <Input
                multiline
                value={numbervalue}
                onChange={numberChange}
                inputProps={{
                  pattern: "[0-9]*",
                  inputMode: "numeric",
                }}
              />
            </div>
            <div className="drawer-item">
              <span>地址</span>
              <Input
                defaultValue="style"
                multiline
                inputProps={ariaLabel}
              />
            </div>
            <div className="drawer-item">
              <span>地图标记</span>
              <Input
                defaultValue="style"
                multiline
                inputProps={ariaLabel}
              />
            </div>
            <div className="drawer-item">
              <span>可停放类型</span>
              <Select variant="outlined"  value={value} onChange={handleChange}>
                <MenuItem value="option1">选项1</MenuItem>
                <MenuItem value="option2">选项2</MenuItem>
                <MenuItem value="option3">选项3</MenuItem>
              </Select>
            </div>
          </div>
          <div>
            <Button variant="contained" onClick={()=> props.setOpen(false)}>取消</Button>
            <Button style={{ marginLeft: "10px" }} variant="contained">
              修改
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
