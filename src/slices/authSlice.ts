import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Tokens } from "../types";

const initialState: Tokens = {
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<Tokens>) => {
      localStorage.setItem("accessToken", action.payload.accessToken);
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.refreshToken = action.payload.refreshToken;
      return state;
    },
    logout: (state) => {
      localStorage.removeItem("accessToken");
      state.accessToken = "";
      localStorage.removeItem("refreshToken");
      state.refreshToken = "";
      window.location.href = "/";
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
