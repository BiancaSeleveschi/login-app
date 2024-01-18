import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "users",
  initialState: { isLoggedIn: false },
  reducers: {
    setUserIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      console.log("ise logged in:", state.isLoggedIn)
    },
  },
});

export const { setUserIsLoggedIn } = loginSlice.actions;
export default loginSlice.reducer;
