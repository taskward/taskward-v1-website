import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import clsx from "clsx";
import styles from "./styles.module.css";
import { Icon, Loading, Button } from "@components";
import { isLogin, APPLICATION_NAME } from "@utils";
import { useImageLoaded } from "@hooks";
import GitHubIcon from "./GitHubIcon";
import taskward from "@assets/img/taskward.png";
import homeBackground from "@assets/background/home.jpg";

type HomeState = {
  isBackHome: boolean;
};

export default function Home(): JSX.Element {
  const { t } = useTranslation(["common", "app"]);
  const navigate = useNavigate();
  const loginStatus: boolean = isLogin();
  const backgroundImageLoaded = useImageLoaded(homeBackground);
  const { isBackHome } = useLocation().state
    ? (useLocation().state as HomeState)
    : { isBackHome: false };

  useEffect(() => {
    if (loginStatus && !isBackHome) {
      navigate("/note", { replace: true });
    }
  }, []);

  function handleClickStartBtn() {
    if (isLogin()) {
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
        "w-screen h-screen relative select-none bg-cover bg-center",
        styles.background
      )}
      style={{ backgroundImage: `url(${homeBackground})` }}
    >
      <div className="inset-0 absolute w-fit h-fit m-auto">
        <div className="flex flex-col gap-2 mb-36">
          <div className="flex flex-col items-center gap-2">
            <span
              className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-300
            mb-2 select-none animate-[pulse_2s_linear_infinite]"
            >
              {APPLICATION_NAME}
            </span>
          </div>
          <span className="text-center text-lg text-gray-600">
            <Trans i18nKey="TASKWARD.APP.DESCRIPTION.FIRST.LINE" ns="app">
              {"Taskward means"}
              <span className="underline decoration-dotted decoration-gray-500 hover:decoration-emerald-600 hover:text-emerald-600 underline-offset-4 transition-colors cursor-pointer">
                {"task-oriented"}
              </span>
              {", is a Todo&Tasks App."}
            </Trans>
          </span>
          <span className="text-center text-lg text-gray-600">
            {t("app:TASKWARD.APP.DESCRIPTION.SECOND.LINE")}
          </span>
          <div className="flex justify-center items-center gap-4 mt-2">
            {!loginStatus && (
              <Button
                title={t("common:LOGIN")}
                onClick={() => {
                  handleClickLoginBtn();
                }}
                icon={
                  <Icon.Login
                    width="16"
                    height="16"
                    className="fill-white flex-shrink-0"
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
