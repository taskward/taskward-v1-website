import { configureStore } from "@reduxjs/toolkit";
import { default as sidebarReducer } from "./menuSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
