import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export const Home = () => {
  const userIsLoggedIn = useSelector((state) => state.users.isLoggedIn);

  return (
    <div>
      <Typography
        variant="h1"
        sx={{
          pt: 7,
          textAlign: "center",
          mb: 7,
          fontFamily: "YourFontName, sans-serif",
          letterSpacing: "5px",
        }}
      >
        Welcome!
      </Typography>
      {!userIsLoggedIn && (
  <>
    <Typography
      variant="h6"
      sx={{
        pt: 7,
        textAlign: "center",
        fontFamily: "YourFontName, sans-serif",
        letterSpacing: "2px",
      }}
    >
      Please login
    </Typography>
    <span className="animated-arrow" />
  </>
) }

    </div>
  );
};
