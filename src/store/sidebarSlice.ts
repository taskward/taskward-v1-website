import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";

export type SidebarMode = "collapse" | "expand";

interface SidebarState {
  sidebarMode: SidebarMode;
  currentTitleKey: any;
}

const initialState = {
  sidebarMode: "collapse",
  currentTitleKey: "SIDEBAR.NOTE",
} as SidebarState;

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    changeMode: (state) => {
      if (state.sidebarMode === "collapse") {
        state.sidebarMode = "expand";
      } else {
        state.sidebarMode = "collapse";
      }
    },
    changeCurrentTitleKey: (state, action: PayloadAction<string>) => {
      state.currentTitleKey = action.payload;
    },
  },
});

export const getSidebarStore = (state: RootState) => state.sidebar;
export const getSidebarMode = (state: RootState) => state.sidebar.sidebarMode;
export const getSidebarCurrentTitleKey = (state: RootState) =>
  state.sidebar.currentTitleKey;

export const sidebarAction = sidebarSlice.actions;

export default sidebarSlice.reducer;
