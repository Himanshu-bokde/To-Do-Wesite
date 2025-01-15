import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: localStorage.getItem("name") || null };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action);
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("name");
      localStorage.removeItem("id");
      localStorage.removeItem("token");
    },
  },
});

export const selectUserName = (state) => {
  return state.auth?.user || "Guest";
};

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
