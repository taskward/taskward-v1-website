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
      window.localStorage.setItem("taskwardToken", response.data);
    }
  } catch (error) {
    console.error(error);
  }
}

export { loginByGitHubCode };
