import {
  LOCAL_STORAGE_TASKWARD_TOKEN,
  LOCAL_STORAGE_TASKWARD_USER,
} from "@requests";
import { type UserInfo } from "@store";

function isLogin(): boolean {
  const hasToken = window.localStorage.getItem(LOCAL_STORAGE_TASKWARD_TOKEN);
  return hasToken !== null && hasToken !== "";
}

function getUserInfo(): UserInfo {
  let userData = window.localStorage.getItem(LOCAL_STORAGE_TASKWARD_USER);
  let userInfo: UserInfo = JSON.parse(userData ?? "");
  return userInfo;
}

export { isLogin, getUserInfo };
