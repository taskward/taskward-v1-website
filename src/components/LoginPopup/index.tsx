import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginByGitHubCode } from "@requests";
import { useQueryString } from "@hooks";
import { LOCAL_STORAGE_TOKEN, getDocumentTitle } from "@utils";
import { LoginFormData, loginFormSchema } from "@interfaces";

import { Loading, Button, Icon, Input } from "@components";
import GitHubButton from "./GitHubButton/index";

import taskward from "@assets/img/taskward.png";

export default function LoginPopup(): JSX.Element {
  const { t, i18n } = useTranslation(["common", "request"]);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state: any = history.state;

  const code = useQueryString("code");

  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: yupResolver(loginFormSchema) });

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

  const onSubmit = (formData: LoginFormData) => {
    console.log(formData);
    console.log(watch("password"), watch("username"));
  };

  if (loginLoading) {
    return <Loading />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-20 flex min-h-fit min-w-[360px] flex-col gap-2 rounded-lg bg-white p-6 text-gray-900 shadow-md shadow-gray-600 dark:bg-[#36393f] dark:text-gray-300"
    >
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
        inputTitle={t("request:USER.USERNAME")}
        placeholder={t("request:LOGIN.PLACEHOLDER.USERNAME")}
        maxLength={30}
        required
        register={{ ...register("username") }}
        error={errors.username}
        errorMessage={t("request:LOGIN.INVALID.USERNAME")}
      />
      <Input
        inputWrapperClassName="relative"
        inputTitle={t("common:PASSWORD")}
        type={showPassword ? undefined : "password"}
        placeholder={t("request:LOGIN.PLACEHOLDER.PASSWORD")}
        maxLength={30}
        required
        register={{ ...register("password") }}
        error={errors.password}
        errorMessage={t("request:LOGIN.INVALID.PASSWORD")}
        rightIcon={
          showPassword ? (
            <Icon.VisibilityOff
              width="20"
              height="20"
              className="absolute inset-y-0 right-2 z-10 m-auto cursor-pointer fill-black dark:fill-white"
              onClick={() => {
                setShowPassword(false);
              }}
            />
          ) : (
            <Icon.Visibility
              width="20"
              height="20"
              className="absolute inset-y-0 right-2 z-10 m-auto cursor-pointer fill-black dark:fill-white"
              onClick={() => {
                setShowPassword(true);
              }}
            />
          )
        }
      />
      <Button
        type="submit"
        title={t("common:LOGIN")}
        block
        className="mt-3"
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
    </form>
  );
}
