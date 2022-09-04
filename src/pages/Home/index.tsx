import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import clsx from "clsx";

import { useImageLoaded } from "@hooks";
import { APPLICATION_NAME } from "@constants";

import { Icon, Loading, Button } from "@components";
import GitHubIcon from "./GitHubIcon";

import taskward from "@assets/img/taskward.png";
import homeBackground from "@assets/background/home.jpg";
import { validateTokenExpireTime } from "@utils";

export default function Home(): JSX.Element {
  const { t } = useTranslation(["common", "app"]);
  const navigate = useNavigate();
  const backgroundImageLoaded = useImageLoaded(homeBackground);

  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const validateTokenResult: boolean = validateTokenExpireTime();
    if (validateTokenResult) {
      //navigate("/note");
      setIsLogin(true);
    }
  }, [isLogin]);

  function handleClickStartBtn() {
    if (validateTokenExpireTime()) {
      navigate("/note");
    } else {
      navigate("/login");
    }
  }

  function handleClickLoginBtn() {
    navigate("/login");
  }

  if (!backgroundImageLoaded) {
    return <Loading fullScreen />;
  }

  return (
    <div
      className={clsx(
        "relative h-screen w-screen select-none bg-cover bg-center"
      )}
      style={{ backgroundImage: `url(${homeBackground})` }}
    >
      <div className="absolute inset-0 m-auto h-fit w-fit">
        <div className="mb-20 flex flex-col gap-2">
          <div className="flex flex-col items-center gap-1">
            <span className="mb-1 animate-[pulse_2s_linear_infinite] select-none bg-gradient-to-r from-emerald-600 to-violet-300 bg-clip-text text-7xl text-transparent">
              {APPLICATION_NAME}
            </span>
            {import.meta.env.VITE_VERSION && (
              <div className="select-none bg-gradient-to-r from-emerald-600 to-violet-300 bg-clip-text text-lg font-medium text-transparent">
                v-{import.meta.env.VITE_VERSION}
              </div>
            )}
            {!import.meta.env.PROD && (
              <div className="select-none bg-gradient-to-r from-emerald-600 to-violet-300 bg-clip-text text-sm font-medium text-transparent">
                {t("common:TEST.ENVIRONMENT")}
              </div>
            )}
            <span className="text-center text-lg text-gray-600">
              <Trans i18nKey="TASKWARD.APP.DESCRIPTION.FIRST.LINE" ns="app">
                {"Taskward means"}
                <span className="cursor-pointer underline decoration-gray-500 decoration-dotted underline-offset-4 transition-colors hover:text-emerald-600 hover:decoration-emerald-600">
                  {"task-oriented"}
                </span>
                {", is a Todo&Tasks App."}
              </Trans>
            </span>
            <span className="text-center text-lg text-gray-600">
              {t("app:TASKWARD.APP.DESCRIPTION.SECOND.LINE")}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-center gap-4">
            {!isLogin && (
              <Button
                size="lg"
                title={t("common:LOGIN")}
                onClick={() => {
                  handleClickLoginBtn();
                }}
                icon={
                  <Icon.Login
                    width="16"
                    height="16"
                    className="flex-shrink-0 fill-white"
                  />
                }
              />
            )}
            <Button
              size="lg"
              title={t("common:START")}
              onClick={() => {
                handleClickStartBtn();
              }}
              icon={
                <img
                  src={taskward}
                  width="16"
                  height="16"
                  className="flex-shrink-0"
                />
              }
            />
          </div>
          <div className="mt-2">
            <GitHubIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
