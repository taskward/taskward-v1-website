import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  id?: number | null;
  name?: string | null;
  avatarUrl?: string | null;
  biography?: string | null;
  email?: string | null;
  location?: string | null;
}

interface UserState {
  userInfo: UserInfo | null;
}

const initialState = {
  userInfo: null,
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
