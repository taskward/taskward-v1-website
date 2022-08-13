import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  id: number | null;
  name: string | null;
  avatarUrl?: string | null;
  biography?: string | null;
  email?: string | null;
  location?: string | null;
}

interface UserState {
  userInfo: UserInfo;
}

const a = {
  userInfo: {
    id: null,
    name: null,
    avatarUrl: null,
    biography: null,
    email: null,
    location: null,
  },
} as UserState;

const testState = {
  userInfo: {
    id: 1,
    name: "Bruce",
    avatarUrl: null,
    biography: null,
    email: null,
    location: null,
  },
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState: testState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
