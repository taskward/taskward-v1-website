import { axiosService } from "@requests";

async function loginByGitHubCode(code: string) {
  let response = await axiosService({
    method: "POST",
    url: `auth/github?code=${code}`,
    headers: {
      accept: "application/json",
    },
  });
  console.log(response);
}

export { loginByGitHubCode };
