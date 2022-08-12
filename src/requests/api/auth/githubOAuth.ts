import { axiosService } from "@requests";

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
        window.localStorage.setItem("taskward_token", response.data.token);
      response.data.user &&
        window.localStorage.setItem(
          "taskward_user",
          JSON.stringify(response.data.user)
        );
    }
  } catch (error) {
    console.error(error);
  }
}

export { loginByGitHubCode };
