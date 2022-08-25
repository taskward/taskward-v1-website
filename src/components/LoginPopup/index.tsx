import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import styles from "./styles.module.css";

import { loginByGitHubCode, loginByUsername } from "@requests";
import { useQueryString } from "@hooks";
import { getDocumentTitle } from "@utils";
import { LOCAL_STORAGE_TOKEN } from "@constants";
import { LoginFormData, loginFormSchema } from "@interfaces";

import { Loading, Button, Icon, Input, GitHubButton } from "..";

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
    setValue,
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

  const changeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGitHubLogin = async (abortSignal: AbortSignal) => {
    if (code) {
      setLoginLoading(true);
      const loginResult: boolean = await loginByGitHubCode(code, abortSignal);
      setLoginLoading(false);
      if (loginResult) {
        navigate("/note", { replace: true });
      }
    }
  };

  const handleUsernameLogin = async (formData: LoginFormData) => {
    setLoginLoading(true);
    const loginResult: boolean = await loginByUsername(formData);
    setLoginLoading(false);
    setValue("password", "");
    if (loginResult) {
      navigate("/note", { replace: true });
    }
  };

  if (loginLoading) {
    return <Loading />;
  }

  return (
    <form
      onSubmit={handleSubmit(handleUsernameLogin)}
      className={clsx(
        styles.formWrapper,
        "mb-10 flex min-h-fit min-w-[360px] flex-col gap-2 rounded-lg bg-white p-6 text-gray-900 shadow-md shadow-gray-600 dark:bg-[#36393f] dark:text-gray-300 dark:shadow-gray-800"
      )}
    >
      <div className="flex items-center justify-center gap-2 text-center text-xl font-semibold">
        <img
          src={taskward}
          width="28"
          height="28"
          loading="eager"
          className="cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
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
          watch("password")?.length > 0 ? (
            <div
              className="absolute inset-y-0 right-1.5 z-10 m-auto flex h-fit w-fit cursor-pointer items-center justify-center rounded-full p-1.5 transition-colors hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600"
              onClick={() => {
                changeShowPassword();
              }}
            >
              {showPassword ? (
                <Icon.VisibilityOff
                  width="18"
                  height="18"
                  className="fill-black dark:fill-white"
                />
              ) : (
                <Icon.Visibility
                  width="18"
                  height="18"
                  className="fill-black dark:fill-white"
                />
              )}
            </div>
          ) : null
        }
      />
      <div>
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
        <div className="my-2 flex items-center gap-1 px-0.5 text-xs font-medium">
          {t("request:LOGIN.NEED.NEW.ACCOUNT")}
          <Link
            to="/signup"
            className="font-semibold text-emerald-600 underline-offset-2 hover:underline"
          >
            {t("common:SIGNUP")}
          </Link>
        </div>
        <div className="mx-1 mt-1 border dark:border-gray-600" />
      </div>
      <GitHubButton className="mt-1" title={t("request:LOGIN.WITH.GITHUB")} />
      {state?.message && (
        <span className="mt-2 select-none text-center text-sm font-medium text-red-600">
          {state.message}
        </span>
      )}
    </form>
  );
}
