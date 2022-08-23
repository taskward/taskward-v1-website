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
    <div className="mb-20 flex min-h-fit min-w-[360px] flex-col gap-2 rounded-lg bg-white p-6 text-gray-900 shadow-md shadow-gray-600 dark:bg-[#36393f] dark:text-gray-300">
      <div className="flex items-center justify-center gap-2 text-center text-xl font-semibold">
        <img src={taskward} width="28" height="28" loading="eager" />
        {t("request:LOGIN.TITLE")}
      </div>
      <div className="mt-2 flex flex-col text-sm">
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
        required
      />
      <Input
        title={t("common:PASSWORD")}
        type="password"
        placeholder={t("request:LOGIN.PLACEHOLDER.PASSWORD")}
        required
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
            className="flex-shrink-0 fill-white"
          />
        }
      />
      <div className="mx-1 mt-1 border dark:border-gray-600" />
      <GitHubButton className="mt-1" />
      {state?.message && (
        <span className="mt-2 select-none text-center text-sm font-bold text-red-600">
          {state.message}
        </span>
      )}
    </div>
  );
}
