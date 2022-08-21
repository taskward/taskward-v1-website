import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER } from "@utils";
import { type User } from "@interfaces";

function isLogin(): boolean {
  const hasToken: string | null = localStorage.getItem(LOCAL_STORAGE_TOKEN);
  return hasToken !== null && hasToken !== "";
}

function getUserInfoFromStorage(): User | null {
  let userData: string | null = localStorage.getItem(LOCAL_STORAGE_USER);
  if (!userData) {
    return null;
  }
  let userInfo: User = JSON.parse(userData);
  return userInfo;
}

function getToken(): string | null {
  return localStorage.getItem(LOCAL_STORAGE_USER);
}

function clearLocalStorage() {
  localStorage.clear();
}

export { isLogin, getUserInfoFromStorage, getToken, clearLocalStorage };
