import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER } from "@utils";
import { type UserInfo } from "@store";

function isLogin(): boolean {
  const hasToken = localStorage[LOCAL_STORAGE_TOKEN];
  return hasToken !== null && hasToken !== "";
}

function getUserInfoFromStorage(): UserInfo | null {
  let userData = localStorage[LOCAL_STORAGE_USER];
  if (!userData) {
    return null;
  }
  let userInfo: UserInfo = JSON.parse(userData);
  return userInfo;
}

function getToken(): string | null {
  return localStorage[LOCAL_STORAGE_TOKEN];
}

export { isLogin, getUserInfoFromStorage, getToken };
