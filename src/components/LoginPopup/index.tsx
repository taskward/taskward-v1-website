import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { loginByGitHubCode } from "@requests";
import { useQueryString } from "@hooks";
import { LOCAL_STORAGE_TOKEN, getDocumentTitle } from "@utils";

import { Loading, Button, Icon, Input } from "@components";
import GitHubButton from "./GitHubButton/index";

import taskward from "@assets/img/taskward.png";

export default function LoginPopup(): JSX.Element {
  const { t, i18n } = useTranslation(["common", "request"]);
  const navigate = useNavigate();
  const state: any = history.state;

  const code = useQueryString("code");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller: AbortController = new AbortController();
    if (localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
      navigate("/note", { replace: true });
    } else {
      handleGitHubLogin(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    document.title = getDocumentTitle(t("request:LOGIN.TITLE"));
  }, [i18n.language]);

  const handleGitHubLogin = async (abortSignal: AbortSignal) => {
    if (code) {
      setLoginLoading(true);
      const loginResult: boolean = await loginByGitHubCode(code, abortSignal);
      setLoginLoading(false);
      loginResult && navigate("/note", { replace: true });
    }
  };

  if (loginLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col min-w-[360px] min-h-fit p-6 gap-2 mb-20 shadow-md shadow-gray-600 bg-white dark:bg-[#36393f] text-gray-900 dark:text-gray-300 rounded-lg">
      <div className="text-center font-semibold text-xl flex justify-center items-center gap-2">
        <img src={taskward} width="28" height="28" loading="eager" />
        {t("request:LOGIN.TITLE")}
      </div>
      <div className="flex flex-col text-sm mt-2">
        <span className="text-center">
          👏 {t("request:LOGIN.WELCOME.FIRST.LINE")}
        </span>
        <span className="text-center">
          🎉 {t("request:LOGIN.WELCOME.SECOND.LINE")}
        </span>
      </div>
      <Input
        className="mt-2"
        title={t("request:USER.EMAIL")}
        placeholder={t("request:LOGIN.PLACEHOLDER.EMAIL")}
      />
      <Input
        title={t("common:PASSWORD")}
        type="password"
        placeholder={t("request:LOGIN.PLACEHOLDER.PASSWORD")}
      />
      <Button
        title={t("common:LOGIN")}
        block
        disabled
        className="mt-3 cursor-not-allowed"
        icon={
          <Icon.Login
            width="16"
            height="16"
            className="fill-white flex-shrink-0"
          />
        }
      />
      <div className="border mt-1 dark:border-gray-600 mx-1" />
      <GitHubButton className="mt-1" />
      {state?.message && (
        <span className="text-sm text-red-600 mt-2 font-bold select-none text-center">
          {state.message}
        </span>
      )}
    </div>
  );
}
