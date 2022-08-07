import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SidebarMode = "collapse" | "expand";

export enum ActiveSidebarItem {
  "None",
  "Note",
  "Archive",
  "Trash",
}

interface SidebarState {
  sidebarMode: SidebarMode;
  activeSidebarItem: ActiveSidebarItem;
}

const initialState = {
  sidebarMode: "collapse",
  activeSidebarItem: ActiveSidebarItem.Note,
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
    changeActiveSidebarItem: (
      state,
      action: PayloadAction<ActiveSidebarItem>
    ) => {
      state.activeSidebarItem = action.payload;
    },
  },
});

export const sidebarAction = sidebarSlice.actions;

export default sidebarSlice.reducer;
