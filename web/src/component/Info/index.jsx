import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import "./index.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // console.log(Username: ${username}, Password: ${password});
  };

  return (
    <div className="info-container">
      <div className="info-form-container">
        <h2>Welcome back!</h2>

        <form onSubmit={handleSubmit}>
          <TextField
            label="nickname"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            InputProps={{
              startAdornment: <AccountCircle color="disabled" />,
            }}
            margin="normal"
          />
          <TextField
            label="name"
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
          <TextField
            label="intro"
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
          <TextField
            label="phone"
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
          <TextField
            label="confirm Password"
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
            修改
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
