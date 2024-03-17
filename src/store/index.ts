import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './sidebarSlice'
import userReducer from './userSlice'
import styleReducer from './styleSlice'
import notificationSlice from './notificationSlice'
import requestSlice from './requestSlice'

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    user: userReducer,
    style: styleReducer,
    notification: notificationSlice,
    request: requestSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { sidebarAction, ActiveSidebarItem } from './sidebarSlice'
export { userAction } from './userSlice'
export { styleAction, type ThemeMode } from './styleSlice'
export { notificationAction } from './notificationSlice'
export { requestAction } from './requestSlice'
