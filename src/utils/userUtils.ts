import { LOCAL_STORAGE_TASKWARD_TOKEN } from "@requests";

function isLogin(): boolean {
  const hasToken = window.localStorage.getItem(LOCAL_STORAGE_TASKWARD_TOKEN);
  return hasToken !== null && hasToken !== "";
}

export { isLogin };
