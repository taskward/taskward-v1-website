import { useEffect } from "react";
import { loginByGitHubCode, LOCAL_STORAGE_TASKWARD_TOKEN } from "@requests";
import { useQueryString } from "@hooks";
import { useNavigate } from "react-router-dom";

export default function LoginPopup(): JSX.Element {
  const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
  const REDIRECT_URL = `${import.meta.env.VITE_TASKWARD_BASE_URL}login`;
  const code = useQueryString("code");
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem(LOCAL_STORAGE_TASKWARD_TOKEN)) {
      navigate("/note", { replace: true });
    } else {
      handleGitHubLogin();
    }
  }, []);

  async function handleGitHubLogin() {
    if (code) {
      await loginByGitHubCode(code);
      navigate("/note", { replace: true });
    }
  }

  return (
    <a
      href={`${AUTHORIZE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`}
    >
      <h1 className="bg-white w-fit cursor-pointer rounded-md p-2 whitespace-nowrap hover:bg-slate-300">
        GitHub Login
      </h1>
    </a>
  );
}
