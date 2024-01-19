import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserIsLoggedIn } from "../redux/UserReducer";
import { getAuth, signOut } from "firebase/auth";

export default function Navbar() {
  const userIsLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful. ");
        dispatch(setUserIsLoggedIn(false));
      })
      .catch((error) => {
        console.log("An error happened", error);
      });
  };
  const login = () => {
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1, mx: -1, mt: -1 }}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          {userIsLoggedIn ? (
            <Button
              color="inherit"
              onClick={logout}
              sx={{
                "&:hover": {
                  color: "gray",
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={login}
              sx={{
                "&:hover": {
                  color: "gray",
                },
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
