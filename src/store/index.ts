import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./sidebarSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { sidebarAction, ActiveSidebarItem } from "./sidebarSlice";
export { userAction, type UserInfo } from "./userSlice";
