import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import userReducer from "./userSlice";
import styleReducer from "./styleSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    user: userReducer,
    style: styleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { sidebarAction, ActiveSidebarItem } from "./sidebarSlice";
export { userAction } from "./userSlice";
export { styleAction, type ThemeMode } from "./styleSlice";
