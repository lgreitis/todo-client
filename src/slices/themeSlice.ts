import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Theme {
  color: "light" | "dark";
}

const localTheme = localStorage.getItem("theme");

const initialState: Theme = {
  color: localTheme === "dark" || localTheme === "light" ? localTheme : "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const nextTheme = state.color === "dark" ? "light" : "dark";
      localStorage.setItem("theme", nextTheme);
      state.color = nextTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
