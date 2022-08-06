import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";

export type SidebarMode = "collapse" | "expand";

interface SidebarState {
  sidebarMode: SidebarMode;
}

const initialState = {
  sidebarMode: "collapse",
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
  },
});

export const { changeMode } = sidebarSlice.actions;

export const getSidebarMode = (state: RootState) => state.sidebar.sidebarMode;

export default sidebarSlice.reducer;
