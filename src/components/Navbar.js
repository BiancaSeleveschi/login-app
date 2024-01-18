import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

export default function ButtonAppBar() {
    const userIsLoggedIn = useSelector((state) => state.users.userIsLoggedIn);
    console.log(userIsLoggedIn);
  return (
    <Box sx={{ flexGrow: 1, mx: -1, mt: -1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          {userIsLoggedIn ? (
            <Button color="inherit" onClick={console.log(userIsLoggedIn)}>Logout</Button>
          ) : (
            <Button color="inherit"onClick={console.log(userIsLoggedIn)}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
