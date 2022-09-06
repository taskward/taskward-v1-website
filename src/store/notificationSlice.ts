import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface notificationState {
  tipText: string | null;
  showTip: boolean;
}

const initialState = {
  tipText: null,
  showTip: false,
} as notificationState;

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    changeShowTip: (state) => {
      state.showTip = !state.showTip;
    },
    changeTipText: (state, action: PayloadAction<string | null>) => {
      state.tipText = action.payload;
    },
  },
});

export const notificationAction = notificationSlice.actions;

export default notificationSlice.reducer;
