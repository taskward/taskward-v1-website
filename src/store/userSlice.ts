import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@interfaces";

interface UserState {
  user: User | null;
}

const initialState = {
  user: null,
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
