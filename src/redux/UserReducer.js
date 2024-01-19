import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "users",
  initialState: { isLoggedIn: false },
  reducers: {
    setUsers: (state, action) => {
      
    },
    setUserIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUserIsLoggedIn } = loginSlice.actions;
export default loginSlice.reducer;
