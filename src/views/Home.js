import { Typography, Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export const Home = () => {
  const userIsLoggedIn = useSelector((state) => state.users.isLoggedIn);

  return (
    <div>
      {userIsLoggedIn ? (
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
      ) : (
        <Box>
          <Typography
            variant="h2"
            sx={{
              pt: 17,
              textAlign: "center",
              fontFamily: "YourFontName, sans-serif",
              letterSpacing: "2px",
            }}
          >
            Hi!
            <p style={{ fontSize: "20px", paddingTop: 60 }} variant="h5">
              Please login!
            </p>
          </Typography>
          <span className="animated-arrow" />
        </Box>
      )}
    </div>
  );
};
