import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

interface StyleState {
  themeMode: ThemeMode;
}

// Theme Mode Priority:
// 1. User Preference
// 2. System Detect
// 3. Default light mode
// TODO: Save in db
function initialThemeMode() {
  const themeModeFromStorage: string | null = localStorage.getItem("theme");
  const isDarkModeBySystemDetect = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  if (themeModeFromStorage === "light") {
    return "light";
  } else if (themeModeFromStorage === "dark" || isDarkModeBySystemDetect) {
    document.documentElement.classList.add("dark");
    return "dark";
  } else {
    return "light";
  }
}

const initialState: StyleState = {
  themeMode: initialThemeMode(),
};

export const styleSlice = createSlice({
  name: "style",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
  },
});

export const styleAction = styleSlice.actions;

export default styleSlice.reducer;
