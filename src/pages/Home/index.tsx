import clsx from "clsx";
import styles from "./styles.module.css";
import GitHubIcon from "./GitHubIcon";
import { Link } from "react-router-dom";
import { APPLICATION_NAME } from "@utils";
import taskward from "@assets/img/taskward.png";
import { Icon } from "@components";
import { useTranslation } from "react-i18next";
import { isLogin } from "@utils";

export default function Home(): JSX.Element {
  const { t } = useTranslation();
  const showLoginButton = !isLogin();

  return (
    <div
      className={clsx(
        "w-screen h-screen relative select-none",
        styles.background
      )}
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
            {"Taskward means task-oriented, is a Todo&Tasks App."}
          </span>
          <span className="text-center text-lg text-gray-600">
            {"It can help you record something you plan to do."}
          </span>
          <div className="flex justify-center items-center gap-4 mt-2">
            {showLoginButton && (
              <Link
                to="/login"
                className="shadow-sm shadow-emerald-800 text-center w-fit min-w-20 p-1 cursor-pointer rounded-md text-white bg-gradient-to-br from-emerald-300 to-emerald-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <span className="whitespace-nowrap text-md flex items-center justify-center gap-1">
                  <Icon.Login
                    width="16"
                    height="16"
                    className="fill-white flex-shrink-0"
                  />
                  {t("LOGIN")}
                </span>
              </Link>
            )}
            <Link
              to="/note"
              className="shadow-sm shadow-emerald-800 text-center w-fit min-w-20 p-1 cursor-pointer rounded-md text-white bg-gradient-to-br from-emerald-300 to-emerald-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="whitespace-nowrap text-md flex items-center justify-center gap-1">
                <img
                  src={taskward}
                  width="16"
                  height="16"
                  className="flex-shrink-0"
                />
                {t("START")}
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
