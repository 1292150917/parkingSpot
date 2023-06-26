import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import fetch from '../../fetch'
import "./index.scss";

function Login() {
  const [nickname, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch('/user/login', {
      method: 'POST',
      body: JSON.stringify({
        nickname: nickname,
        password
      })
    },res =>{
      if(res.code === '200'){
        alert('登录成功')
        sessionStorage.userInfo = JSON.stringify(res.data)
        window.location = "/"
      }
    })
  };

  return (
    <div className="container">
      <div className="image-container">
        <img src="./images/background.png" alt="Login image" />
      </div>
      <div className="form-container">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Nickname"
            variant="outlined"
            value={nickname}
            onChange={handleUsernameChange}
            fullWidth
            InputProps={{
              startAdornment: <AccountCircle color="disabled" />,
            }}
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              startAdornment: <Lock color="disabled" />,
            }}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
