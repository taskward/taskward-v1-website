import { axiosService } from "@requests";
import { getToken, LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER } from "@utils";
import { i18n } from "@i18n";

async function loginByGitHubCode(
  code: string,
  abortSignal: AbortSignal
): Promise<boolean> {
  try {
    let response = await axiosService({
      method: "POST",
      url: `auth/github?code=${code}`,
      signal: abortSignal,
    });
    if (response.status === 200 && response.data) {
      response.data.token &&
        localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.token);
      response.data.user &&
        localStorage.setItem(
          LOCAL_STORAGE_USER,
          JSON.stringify(response.data.user)
        );
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    history.replaceState(
      { message: i18n.t("request:LOGIN.FAILED") },
      "",
      "/login"
    );
    return false;
  }
}

async function getUserInfo(): Promise<any> {
  let response = await axiosService({
    method: "POST",
    url: `auth/github/user`,
    headers: {
      Authorization: "gt " + getToken(),
    },
  });
  if (response.status === 200 && response.data) {
    response.data.userInfo
      ? localStorage.setItem(
          LOCAL_STORAGE_USER,
          JSON.stringify(response.data.userInfo)
        )
      : localStorage.removeItem(LOCAL_STORAGE_USER);
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
