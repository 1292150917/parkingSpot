import React, { useState } from "react";
import { Button, TextField, Select, MenuItem, InputLabel } from "@mui/material";
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

function Register() {
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNicknameChange = event => {
    setNickname(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleConfirmPasswordChange = event => {
    setConfirmPassword(event.target.value);
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
      "/user/register",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      res => {
        alert("success");
      }
    );
  };

  return (
    <div className="container">
      <div className="image-container">
        <img src="./images/background.png" alt="Login image" />
      </div>
      <div className="form-container">
        <h2>Regoster</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nickname"
            variant="outlined"
            value={nickname}
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
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            InputProps={{
              startAdornment: <Lock color="disabled" />,
            }}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
            margin="normal"
          />
          <div style={{ width: "100%" }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              value={category}
              InputProps={{
                startAdornment: <Person color="disabled" />,
              }}
              variant="outlined"
              onChange={handleCategoryChange}
              fullWidth
            >
              <MenuItem value={1}>Administrator</MenuItem>
              <MenuItem value={2}>User</MenuItem>
              <MenuItem value={3}>Publisher</MenuItem>
            </Select>
          </div>
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
