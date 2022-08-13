import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

interface StyleState {
  themeMode: ThemeMode;
}

const initialState: StyleState = {
  themeMode: "light",
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
