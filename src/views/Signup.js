import React, { useState } from "react";
import { Box, Button, Input, Typography, InputAdornment } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

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
  const [messageConfirmAlert, setmMssageConfirmAlert] = useState("");
  const auth = getAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length > 0) {
        console.error("Error signing up: Email already exists");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully!");
      toast.success("Your account has been created!");
    } catch (error) {
      setShowAlertFirstName(firstName === "" || firstName === " ");
      setShowAlertLastName(lastName === "" || lastName === " ");
      setShowAlertEmail(error.code === "auth/invalid-email" || email === "");
      setShowAlertPassword(
        error.code === "auth/weak-password" ||
          password === "" ||
          password === " "
      );
      if (
        error.code !== "auth/weak-password" &&
        password !== " " &&
        password !== ""
      ) {
        handleConfirmPassword();
      }
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
      if (error?.message) {
        console.error("API response:", error.message);
        toast.error("Email already exists");
      }
    }
  };

  const handleConfirmPassword = () => {
    if (confirmedPassword === " " || confirmedPassword === "") {
      setShowConfirmedPassword(true);
      setmMssageConfirmAlert("Confirm password");
    } else if (password !== confirmedPassword) {
      setShowConfirmedPassword(true);
      setmMssageConfirmAlert("Passwords do not match");
    } else {
      setShowConfirmedPassword(false);
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
        <Box sx={{ display: "inline-block" }}>
          <Input
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="text"
            placeholder="First name"
            color="primary"
            sx={{ ml: 11, mr: 3, mt: 10, width: 150 }}
          />{" "}
          {showAlertFirstName && (
            <span
              style={{
                color: "red",
                display: " block",
                position: "absolute",
                marginLeft: 89,
              }}
            >
              Enter first name
            </span>
          )}
        </Box>{" "}
        <Box sx={{ display: "inline-block" }}>
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
          {showAlertLastName && (
            <span
              style={{
                color: "red",
                display: " block",
                position: "absolute",
              }}
            >
              Enter last name
            </span>
          )}
        </Box>
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
            {messageConfirmAlert}
          </span>
        )}
        <Button
          onClick={handleSignup}
          sx={{ display: "flex", m: "auto", mt: 5, marginBottom: 5 }}
          variant="contained"
          color="primary"
        >
          Sign Up
        </Button>
        <ToastContainer />
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          If you already have an account:
          <Link
            style={{ textDecoration: "none", color: "gray" }}
            onMouseEnter={(e) => (e.target.style.color = "gray")}
            onMouseLeave={(e) => (e.target.style.color = "blue")}
            to="/login"
          >
            {""} Login
          </Link>
        </p>
      </Box>
    </div>
  );
};
