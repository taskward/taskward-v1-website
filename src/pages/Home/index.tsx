import { useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import GitHubIcon from "./GitHubIcon";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { APPLICATION_NAME } from "@utils";
import taskward from "@assets/img/taskward.png";
import homeBackground from "@assets/background/home.jpg";
import { Icon, Loading } from "@components";
import { useTranslation, Trans } from "react-i18next";
import { isLogin } from "@utils";
import { useImageLoaded } from "@hooks";

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
              <Link
                to="/login"
                className="font-medium transition-colors shadow-sm shadow-emerald-800 text-center w-fit py-2 px-3 cursor-pointer rounded-md text-white bg-gradient-to-br from-emerald-300 to-emerald-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <span className="whitespace-nowrap text-md flex items-center justify-center gap-1">
                  <Icon.Login
                    width="16"
                    height="16"
                    className="fill-white flex-shrink-0"
                  />
                  {t("common:LOGIN")}
                </span>
              </Link>
            )}
            <Link
              to="/note"
              className="font-medium transition-colors shadow-sm shadow-emerald-800 text-center w-fit py-2 px-3 cursor-pointer rounded-md text-white bg-gradient-to-br from-emerald-300 to-emerald-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="whitespace-nowrap text-md flex items-center justify-center gap-1">
                <img
                  src={taskward}
                  width="16"
                  height="16"
                  className="flex-shrink-0"
                />
                {t("common:START")}
              </span>
            </Link>
          </div>
          <div className="mt-4">
            <GitHubIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
