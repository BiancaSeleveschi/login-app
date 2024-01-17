import React, { useState } from "react";
import { Box, Button, Input, Typography, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlertEmail, setShowAlertEmail] = useState(false);
  const [showAlertPassword, setShowAlertPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = () => {};
  return (
    <div>
      <Typography
        variant="h2"
        sx={{
          pt: 7,
          textAlign: "center",
          mb: 7,
          fontFamily: "YourFontName, sans-serif",
          letterSpacing: "5px",
        }}
      >
        Login
      </Typography>
      <Box
        sx={{
          background: "white",
          borderRadius: 5,
          width: 500,
          margin: "auto",
          fontSize: "16px",
          py: 8,
          mb: 5,
        }}
      >
        <Input
          value={email || ""}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="Email"
          color="secondary"
          sx={{ display: "flex", margin: "auto", mt: 5, width: 325 }}
        />
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          color="warning"
          sx={{
            display: "flex",
            margin: "auto",
            width: 325,
            mt: 7,
            cursor: "pointer",
          }}
          endAdornment={
            <InputAdornment position="end">
              {showPassword ? (
                <VisibilityIcon onClick={handleTogglePassword} />
              ) : (
                <VisibilityIcon onClick={handleTogglePassword} />
              )}
            </InputAdornment>
          }
        />
        {(showAlertPassword || showAlertEmail) && (
          <p style={{ color: "red", marginLeft: 90, marginTop: 0 }}>
            Invalid email or password
          </p>
        )}

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link
            to="/password-reset"
            style={{
              textDecoration: "none",
              padding: "8px 16px",
              transition: "color 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.color = "blue")}
            onMouseLeave={(e) => (e.target.style.color = "gray")}
          >
            Forgot password?
          </Link>
        </div>
        <Button
          onClick={handleLogin}
          sx={{ display: "flex", m: "auto", mt: 10, marginBottom: 5 }}
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </Box>
      <p
        style={{
          textAlign: "center",
          fontSize: "18px",
        }}
      >
        Need to Signup?
        <Link style={{ textDecoration: "none", color: "blue" }} to="/signup">
          {""} Create Account
        </Link>
      </p>
    </div>
  );
};
