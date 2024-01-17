import React, { useState } from "react";
import { Box, Button, Input, Typography, InputAdornment } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
 import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [showAlertEmail, setShowAlertEmail] = useState(false);
  const [showAlertPassword, setShowAlertPassword] = useState(false);
  const [showAlertLastName, setShowAlertLastName] = useState(false);
  const [showAlertFirstName, setShowAlertFirstName] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully!");
    } catch (error) {
      setShowAlertFirstName(firstName === "");
      setShowAlertLastName(lastName === "");
      setShowAlertEmail(error.code === "auth/invalid-email" || email === "");
      setShowAlertPassword(
        error.code === "auth/weak-password" || password === ""
      );
      setShowConfirmedPassword(password !== confirmedPassword);
      if (
        error.code !== "auth/invalid-email" &&
        error.code !== "auth/weak-password" &&
        password === confirmedPassword &&
        firstName !== "" &&
        lastName !== ""
      ) {
        setShowAlertPassword(false);
        setShowAlertEmail(false);
        setShowConfirmedPassword(false);
        setShowAlertFirstName(false);
        setShowAlertLastName(false);
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleToggleConfirmedPassword = () => {
    setShowConfirmedPassword((prevShowPassword) => !prevShowPassword);
  };
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
        Sign Up
      </Typography>
      <Box
        sx={{
          background: "white",
          borderRadius: 5,
          width: 500,
          margin: "auto",
          fontSize: "16px",
          py: 2,
          mb: 5,
        }}
      >
        <Input
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          type="text"
          placeholder="First name"
          color="primary"
          sx={{ ml: 11, mr: 3, mt: 10, width: 150 }}
        />
        <Input
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          type="text"
          placeholder="Last name"
          color="primary"
          sx={{ mt: 10, width: 150 }}
        />{" "}
        {showAlertFirstName && (
          <span style={{ color: "red", marginLeft: 90 }}>Type first name</span>
        )}
        {showAlertLastName && (
          <span style={{ color: "red", marginLeft: 73 }}>Type last name</span>
        )}
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
        {showAlertEmail && (
          <span style={{ color: "red", marginLeft: 90 }}>
            Please enter a valid email address{" "}
          </span>
        )}
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
            mt: 5,
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
        {showAlertPassword && (
          <p style={{ color: "red", marginLeft: 90, width: 340, marginTop: 0 }}>
            Password must contain at least 8 characters including uppercase and
            lowercase letters, numbers, and special characters
          </p>
        )}
        <Input
          value={confirmedPassword}
          onChange={(e) => {
            setConfirmedPassword(e.target.value);
          }}
          type={showConfirmedPassword ? "text" : "password"}
          placeholder="Confirm password"
          color="success"
          sx={{
            display: "flex",
            margin: "auto",
            width: 325,
            mt: 5,
            cursor: "pointer",
          }}
          endAdornment={
            <InputAdornment position="end">
              {showConfirmedPassword ? (
                <VisibilityIcon onClick={handleToggleConfirmedPassword} />
              ) : (
                <VisibilityIcon onClick={handleToggleConfirmedPassword} />
              )}
            </InputAdornment>
          }
        />
        {showConfirmedPassword && (
          <span style={{ color: "red", marginLeft: 90 }}>
            Passwords do not match
          </span>
        )}
        <Button
          onClick={handleSignup}
          sx={{ display: "flex", m: "auto", mt: 10, marginBottom: 10 }}
          variant="contained"
          color="primary"
        >
          Sign Up
        </Button>
      </Box>
      <p
        style={{
          textAlign: "center",
          fontSize: "18px",
        }}
      >
        If you already have an account: 
        <Link style={{ textDecoration: "none", color: "blue" }} to="/login">
        {''}   Login
        </Link>
      </p>
    </div>
  );
};
