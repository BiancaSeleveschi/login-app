import { Input, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "firebase/auth";
import {
  getAuth,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

export const PasswordReset = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [showAlertEmail, setShowAlertEmail] = useState(false);
  const [messageAlert, setMessageAlert] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const resetPassword = async (emailAddress) => {
    try {
      await sendPasswordResetEmail(auth, emailAddress);
      console.log("Password reset email sent successfully");
      navigate("/login");
    } catch (error) {
      if (emailAddress === "" || emailAddress === " ") {
        setShowAlertEmail(true);
        setMessageAlert("Please enter your email");
      } else if (!emailAddress.includes("@, .")) {
        setShowAlertEmail(true);
        setMessageAlert("Please enter a valid email address");
      }
      console.error("Error sending :", error);
    }
  };

  return (
    <div>
      <Typography
        variant="h3"
        sx={{
          pt: 7,
          textAlign: "center",
          mb: 7,
          fontFamily: "YourFontName, sans-serif",
          letterSpacing: "5px",
        }}
      >
        Reset your password
      </Typography>
      <p
        style={{
          paddingTop: 35,
          textAlign: "center",
          fontFamily: "YourFontName, sans-serif",
          letterSpacing: "2px",
        }}
      >
        Enter your email address to receive an email with instructions to reset
        your password.
      </p>
      <Input
        value={emailAddress || ""}
        onChange={(e) => {
          setEmailAddress(e.target.value);
        }}
        type="text"
        placeholder="Email"
        color="secondary"
        sx={{
          border: 1,
          p: 1,
          display: "flex",
          margin: "auto",
          mt: 5,
          width: 325,
        }}
      />
      {showAlertEmail && (
        <span
          style={{
            color: "rgb(112, 0, 0)",
            paddingTop: 5,
            display: "block",
            margin: "auto",
            textAlign: "center",
          }}
        >
          {messageAlert}
        </span>
      )}
      <Button
        onClick={() => {
          resetPassword(emailAddress);
        }}
        sx={{
          display: "flex",
          m: "auto",
          mt: 5,
          marginBottom: 5,
          bgcolor: "black",
        }}
        variant="contained"
      >
        Reset Password
      </Button>
    </div>
  );
};
