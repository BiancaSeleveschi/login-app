import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { setUserIsLoggedIn } from "../redux/UserReducer";

export default function ButtonAppBar() {
  const userIsLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(setUserIsLoggedIn(false));
  };
  const login = () => {
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1, mx: -1, mt: -1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          {userIsLoggedIn ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={login}>
              Login{" "}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
