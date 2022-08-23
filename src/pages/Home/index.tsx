import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { shallowEqual } from "react-redux";
import clsx from "clsx";

import styles from "./styles.module.css";

import { useImageLoaded, useAppSelector } from "@hooks";
import { APPLICATION_NAME } from "@utils";

import { Icon, Loading, Button } from "@components";
import GitHubIcon from "./GitHubIcon";

import taskward from "@assets/img/taskward.png";
import homeBackground from "@assets/background/home.jpg";

type HomeState = {
  isBackHome: boolean;
};

export default function Home(): JSX.Element {
  const { t } = useTranslation(["common", "app"]);
  const navigate = useNavigate();
  const backgroundImageLoaded = useImageLoaded(homeBackground);

  const { isBackHome } = useLocation().state
    ? (useLocation().state as HomeState)
    : { isBackHome: false };

  const user = useAppSelector((state) => state.user.user, shallowEqual);

  useEffect(() => {
    if (user && !isBackHome) {
      navigate("/note", { replace: true });
    }
  }, []);

  function handleClickStartBtn() {
    if (user) {
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
        "relative h-screen w-screen select-none bg-cover bg-center",
        styles.background
      )}
      style={{ backgroundImage: `url(${homeBackground})` }}
    >
      <div className="absolute inset-0 m-auto h-fit w-fit">
        <div className="mb-36 flex flex-col gap-2">
          <div className="flex flex-col items-center gap-2">
            <span className="mb-2 animate-[pulse_2s_linear_infinite] select-none bg-gradient-to-r from-emerald-600 to-violet-300 bg-clip-text text-7xl text-transparent">
              {APPLICATION_NAME}
            </span>
          </div>
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
          <div className="mt-2 flex items-center justify-center gap-4">
            {!user && (
              <Button
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
          <div className="mt-4">
            <GitHubIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
