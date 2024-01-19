import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "users",
  initialState: {
    isLoggedIn: sessionStorage.getItem("isLoggedIn") === "true" || false,
  },
  reducers: {
    setUserIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      sessionStorage.setItem("isLoggedIn", state.isLoggedIn);
    },
  },
});

export const { setUserIsLoggedIn } = loginSlice.actions;
export default loginSlice.reducer;
