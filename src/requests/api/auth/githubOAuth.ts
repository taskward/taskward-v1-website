import { axiosService } from "@requests";

const LOCAL_STORAGE_TASKWARD_TOKEN = "taskward_token";
const LOCAL_STORAGE_TASKWARD_USER = "taskward_user";

async function loginByGitHubCode(code: string) {
  try {
    let response = await axiosService({
      method: "POST",
      url: `auth/github?code=${code}`,
      headers: {
        accept: "application/json",
      },
    });
    if (response.data) {
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
    }
  } catch (error) {
    console.error(error);
  }
}

export {
  loginByGitHubCode,
  LOCAL_STORAGE_TASKWARD_TOKEN,
  LOCAL_STORAGE_TASKWARD_USER,
};
