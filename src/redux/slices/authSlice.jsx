import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: JSON.parse(localStorage.getItem("user")) || null };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.name;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("name");
      localStorage.removeItem("id");
      localStorage.removeItem("user");
    },
  },
});

export const selectUserName = (state) => {
  return state.auth.user.name || "Guest";
};

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
