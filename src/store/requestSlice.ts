import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RequestState {
  isLoading: boolean;
}

const initialState = {
  isLoading: false
} as RequestState;

export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    updateRequestState: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});

export const requestAction = requestSlice.actions;

export default requestSlice.reducer;
