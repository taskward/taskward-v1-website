import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface notificationState {
  text: string | null;
  show: boolean;
}

const initialState = {
  text: null,
  show: false,
} as notificationState;

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    changeShow: (state) => {
      state.show = !state.show;
    },
    changeText: (state, action: PayloadAction<string | null>) => {
      state.text = action.payload;
    },
  },
});

export const notificationAction = notificationSlice.actions;

export default notificationSlice.reducer;
