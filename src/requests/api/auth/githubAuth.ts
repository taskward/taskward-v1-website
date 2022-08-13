import { axiosService } from "@requests";
import { getToken, LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER } from "@utils";

async function loginByGitHubCode(code: string): Promise<boolean> {
  let response = await axiosService({
    method: "POST",
    url: `auth/github?code=${code}`,
  });
  if (response.status === 200 && response.data) {
    response.data.token &&
      window.localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.token);
    response.data.user &&
      window.localStorage.setItem(
        LOCAL_STORAGE_USER,
        JSON.stringify(response.data.user)
      );
    return true;
  }
  return false;
}

async function getUserInfo(): Promise<any> {
  let response = await axiosService({
    url: `auth/github/user`,
    headers: {
      Authorization: "gt " + getToken(),
    },
  });
  if (response.status === 200 && response.data) {
    response.data.userInfo
      ? window.localStorage.setItem(
          LOCAL_STORAGE_USER,
          JSON.stringify(response.data.userInfo)
        )
      : window.localStorage.removeItem(LOCAL_STORAGE_USER);
    return response.data.userInfo;
  }
  return null;
}

export {
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_USER,
  loginByGitHubCode,
  getUserInfo,
};
