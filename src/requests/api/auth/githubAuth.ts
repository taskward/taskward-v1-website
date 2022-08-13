import { axiosService } from "@requests";
import { getToken } from "@utils";

const LOCAL_STORAGE_TASKWARD_TOKEN = "taskward_token";
const LOCAL_STORAGE_TASKWARD_USER = "taskward_user";

async function loginByGitHubCode(code: string): Promise<boolean> {
  try {
    let response = await axiosService({
      method: "POST",
      url: `auth/github?code=${code}`,
    });
    if (response.status === 200 && response.data) {
      response.data.token &&
        window.localStorage.setItem(
          LOCAL_STORAGE_TASKWARD_TOKEN,
          response.data.token
        );
      response.data.user &&
        window.localStorage.setItem(
          LOCAL_STORAGE_TASKWARD_USER,
          JSON.stringify(response.data.user)
        );
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getUserInfo(): Promise<any> {
  try {
    let response = await axiosService({
      url: `auth/github/user`,
      headers: {
        Authorization: "gt " + getToken(),
      },
    });
    if (response.status === 200 && response.data) {
      response.data.userInfo
        ? window.localStorage.setItem(
            LOCAL_STORAGE_TASKWARD_USER,
            JSON.stringify(response.data.userInfo)
          )
        : window.localStorage.removeItem(LOCAL_STORAGE_TASKWARD_USER);
      return response.data.userInfo;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
}

export {
  LOCAL_STORAGE_TASKWARD_TOKEN,
  LOCAL_STORAGE_TASKWARD_USER,
  loginByGitHubCode,
  getUserInfo,
};
