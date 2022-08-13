import {
  LOCAL_STORAGE_TASKWARD_TOKEN,
  LOCAL_STORAGE_TASKWARD_USER,
} from "@requests";
import { type UserInfo } from "@store";

function isLogin(): boolean {
  const hasToken = window.localStorage.getItem(LOCAL_STORAGE_TASKWARD_TOKEN);
  return hasToken !== null && hasToken !== "";
}

function getUserInfoFromStorage(): UserInfo | null {
  let userData = window.localStorage.getItem(LOCAL_STORAGE_TASKWARD_USER);
  if (!userData) {
    return null;
  }
  let userInfo: UserInfo = JSON.parse(userData);
  return userInfo;
}

function getToken(): string | null {
  return window.localStorage.getItem(LOCAL_STORAGE_TASKWARD_TOKEN);
}

export { isLogin, getUserInfoFromStorage, getToken };
