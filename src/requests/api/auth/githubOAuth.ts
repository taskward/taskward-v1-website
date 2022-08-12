import axios from "axios";

async function githubOAuthRequest() {
  try {
    const response = await axios.get(
      `https://github.com/login/oauth/authorize?client_id=7e015d8ce32370079895&redirect_uri=http://localhost:8080/oauth/redirect`
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
export { githubOAuthRequest };
