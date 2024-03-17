import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface notificationState {
  show: boolean
  text: string | null | undefined
  timeout: NodeJS.Timeout | null
}

const initialState = {
  show: false,
  text: null,
  timeout: null
} as notificationState

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    show: (state) => {
      state.show = true
    },
    hide: (state) => {
      state.show = false
    },
    changeText: (state, action: PayloadAction<string | undefined | null>) => {
      state.text = action.payload
    },
    addTimeout: (state, action: PayloadAction<NodeJS.Timeout>) => {
      state.timeout = action.payload
    },
    clearTimeout: (state) => {
      state.timeout = null
    }
  }
})

export const notificationAction = notificationSlice.actions

export default notificationSlice.reducer
