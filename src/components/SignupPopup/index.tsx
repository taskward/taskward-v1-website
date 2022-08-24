import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import styles from "./styles.module.css";

import { loginByGitHubCode, signupByUsername } from "@requests";
import { useQueryString } from "@hooks";
import { LOCAL_STORAGE_TOKEN, getDocumentTitle } from "@utils";
import { SignupFormData, signupFormSchema } from "@interfaces";

import { Loading, Button, Icon, Input, GitHubButton } from "..";

import taskward from "@assets/img/taskward.png";

export default function SignupPopup(): JSX.Element {
  const { t, i18n } = useTranslation(["common", "request"]);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state: any = history.state;

  const code = useQueryString("code");

  const [signupLoading, setSignupLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({ resolver: yupResolver(signupFormSchema) });

  useEffect(() => {
    const controller: AbortController = new AbortController();
    if (localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
      navigate("/note", { replace: true });
    } else {
      handleGitHubSignup(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    document.title = getDocumentTitle(t("request:SIGNUP.TITLE"));
  }, [i18n.language]);

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.password?.length === 0) {
        setShowPassword(false);
      }
      if (value.confirmPassword?.length === 0) {
        setShowConfirmPassword(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const changeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const changeShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGitHubSignup = async (abortSignal: AbortSignal) => {
    if (code) {
      setSignupLoading(true);
      const signupResult: boolean = await loginByGitHubCode(code, abortSignal);
      setSignupLoading(false);
      if (signupResult) {
        navigate("/note", { replace: true });
      }
    }
  };

  const handleUsernameSignup = async (formData: SignupFormData) => {
    setSignupLoading(true);
    const signupResult: boolean = await signupByUsername(formData);
    setSignupLoading(false);
    if (signupResult) {
      navigate("/note", { replace: true });
    }
  };

  if (signupLoading) {
    return <Loading />;
  }

  return (
    <form
      onSubmit={handleSubmit(handleUsernameSignup)}
      className={clsx(
        styles.formWrapper,
        "mb-20 flex min-h-fit min-w-[360px] flex-col gap-2 rounded-lg bg-white p-6 text-gray-900 shadow-md shadow-gray-600 dark:bg-[#36393f] dark:text-gray-300 dark:shadow-gray-800"
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
        {t("request:SIGNUP.TITLE")}
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
          getValues("password")?.length > 0 ? (
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
      <Input
        inputWrapperClassName="relative"
        inputTitle={t("request:SIGNUP.CONFIRM.PASSWORD")}
        type={showConfirmPassword ? undefined : "password"}
        placeholder={t("request:SIGNUP.PLACEHOLDER.CONFIRM.PASSWORD")}
        maxLength={30}
        required
        register={{ ...register("confirmPassword") }}
        error={errors.confirmPassword}
        errorMessage={t("request:SIGNUP.INVALID.CONFIRM.PASSWORD")}
        rightIcon={
          getValues("confirmPassword")?.length > 0 ? (
            <div
              className="absolute inset-y-0 right-1.5 z-10 m-auto flex h-fit w-fit cursor-pointer items-center justify-center rounded-full p-1.5 transition-colors hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600"
              onClick={() => {
                changeShowConfirmPassword();
              }}
            >
              {showConfirmPassword ? (
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
          title={t("common:SIGNUP")}
          block
          className="mt-3"
          icon={
            <Icon.Key
              width="16"
              height="16"
              className="flex-shrink-0 rotate-90 fill-white"
            />
          }
        />
        <div className="my-2 flex items-center px-0.5 text-xs font-medium">
          已有账号？
          <Link to="/login" className="text-emerald-600">
            {t("common:LOGIN")}
          </Link>
        </div>
        <div className="mx-1 mt-1 border dark:border-gray-600" />
      </div>
      <GitHubButton className="mt-1" title={t("request:SIGNUP.WITH.GITHUB")} />
      {state?.message && (
        <span className="mt-2 select-none text-center text-sm font-medium text-red-600">
          {state.message}
        </span>
      )}
    </form>
  );
}
