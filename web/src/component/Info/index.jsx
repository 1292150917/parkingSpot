import React, { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Tabs,
  Tab,
} from "@mui/material";
import {
  AccountCircle,
  Person,
  Description,
  Phone,
  Lock,
  VisibilityOff,
} from "@mui/icons-material";
import fetch from "../../fetch";
import "./index.scss";

let userInfo = sessionStorage.userInfo
  ? JSON.parse(sessionStorage.userInfo)
  : {};

function Register() {
  const [nickname, setNickname] = useState(userInfo.nickname || "");
  const [name, setName] = useState(userInfo.name || "");
  const [intro, setIntro] = useState(userInfo.intro || "");
  const [phone, setPhone] = useState(userInfo.phone || "");
  const [category, setCategory] = useState(userInfo.category || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bankCard, setBankCard] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [bankTime, setBankTime] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const bankClick = () => {
    console.log(bankCard, bankCode, bankTime);
    const data = {
      ...userInfo,
      bank_card: bankCard,
      bank_code: bankCode,
      bank_time: bankTime,
    };
    fetch(
      "/user/" + userInfo.id,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      res => {
        alert("success");
        sessionStorage.userInfo = JSON.stringify({
          ...userInfo,
          ...data,
        });
        window.location.reload();
      }
    );
  };

  const handleNicknameChange = event => {
    setNickname(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleIntroChange = event => {
    setIntro(event.target.value);
  };

  const handlePhoneChange = event => {
    setPhone(event.target.value);
  };

  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = {
      ...userInfo,
      nickname,
      name,
      intro,
      phone,
      category,
      password,
    };
    if (Object.values(data).filter(item => !item).length) {
      return alert("信息输入完整");
    }
    if (password !== confirmPassword) {
      return alert("两次密码不一致");
    }
    fetch(
      "/user/" + userInfo.id,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      res => {
        alert("success");
        sessionStorage.userInfo = JSON.stringify({
          ...userInfo,
          ...data,
        });
        window.location.reload();
      }
    );
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="info-container">
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="个人信息修改" />
        <Tab label="银行卡信息绑定" />
      </Tabs>
      {tabValue === 0 ? (
        <div style={{ width: "100%", flex: 1 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nickname"
              variant="outlined"
              value={nickname}
              disabled
              onChange={handleNicknameChange}
              fullWidth
              InputProps={{
                startAdornment: <AccountCircle color="disabled" />,
              }}
              margin="normal"
            />
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              fullWidth
              InputProps={{
                startAdornment: <Person color="disabled" />,
              }}
              margin="normal"
            />
            <TextField
              label="Intro"
              variant="outlined"
              value={intro}
              onChange={handleIntroChange}
              fullWidth
              InputProps={{
                startAdornment: <Description color="disabled" />,
              }}
              margin="normal"
            />
            <TextField
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={handlePhoneChange}
              fullWidth
              InputProps={{
                startAdornment: <Phone color="disabled" />,
              }}
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              value={password}
              type={showPassword ? "text" : "password"}
              InputProps={{
                startAdornment: <Lock color="disabled" />,
                endAdornment: (
                  <VisibilityOff
                    color="disabled"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  />
                ),
              }}
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              value={confirmPassword}
              type={showPassword ? "text" : "password"}
              InputProps={{
                startAdornment: <Lock color="disabled" />,
                endAdornment: (
                  <VisibilityOff
                    color="disabled"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  />
                ),
              }}
              onChange={event => setConfirmPassword(event.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </div>
      ) : (
        <div style={{ marginLeft: "20px" }}>
          <TextField
            label="卡号"
            variant="outlined"
            fullWidth
            value={bankCard}
            onChange={event => setBankCard(event.target.value)}
            margin="normal"
          />
          <TextField
            label="code"
            variant="outlined"
            fullWidth
            value={bankCode}
            onChange={event => setBankCode(event.target.value)}
            margin="normal"
          />
          <TextField
            label="时间"
            variant="outlined"
            fullWidth
            value={bankTime}
            onChange={event => setBankTime(event.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={bankClick}
            type="submit"
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}

export default Register;
