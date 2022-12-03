import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface Auth {
  token: string;
  username: string;
}

const initialState: Auth = {
  token: localStorage.getItem("token") || "",
  username: localStorage.getItem("username") || "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<Auth>) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    logout: (state) => {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      state.token = initialState.token;
      state.username = initialState.username;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
