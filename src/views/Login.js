import React, { useState } from "react";
import { Box, Button, Input, Typography, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUserIsLoggedIn } from "../redux/UserReducer";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      toast.success("You are now logged in successfully!");
      console.log("User signed in successfully:", user);
      dispatch(setUserIsLoggedIn(true));
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
      setShowAlert(true);
      dispatch(setUserIsLoggedIn(false));
    }
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
        Login
      </Typography>
      <Box
        sx={{
          background: "white",
          borderRadius: 5,
          width: 500,
          margin: "auto",
          fontSize: "16px",
          py: 2,
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
          sx={{ display: "flex", margin: "auto", mt: 10, width: 325 }}
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
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
        {showAlert && (
          <p style={{ color: "red", textAlign: "center" }}>
            Invalid email address or password
          </p>
        )}
        <Link
          to="/password-reset"
          style={{
            textDecoration: "none",
            color: "gray",
            padding: "8px 16px",
            transition: "color 0.3s ease-in-out",
            display: "block",
            textAlign: "center",
            marginTop: 20,
          }}
          onMouseEnter={(e) => (e.target.style.color = "blue")}
          onMouseLeave={(e) => (e.target.style.color = "gray")}
        >
          Forgot password?
        </Link>
        <Button
          onClick={() => {
            handleLogin(email, password);
          }}
          sx={{ display: "flex", m: "auto", mt: 5, marginBottom: 5 }}
          variant="contained"
          color="primary"
        >
          Login
        </Button>
        <ToastContainer />
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          Need to Signup?
          <Link
            style={{ textDecoration: "none", color: "gray" }}
            onMouseEnter={(e) => (e.target.style.color = "gray")}
            onMouseLeave={(e) => (e.target.style.color = "blue")}
            to="/signup"
          >
            {""} Create Account
          </Link>
        </p>
      </Box>
    </div>
  );
};
