import { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import { Icon } from "..";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@hooks";
import { sidebarAction } from "@store";
import { Tooltip } from "@components";

export default function Header(): JSX.Element {
  const { t } = useTranslation();
  const activeSidebarItem = useAppSelector(
    (state) => state.sidebar.activeSidebarItem
  );

  function getActiveSidebarItemTitle(): string {
    switch (activeSidebarItem) {
      case 1:
        return t("SIDEBAR.NOTE");
      case 2:
        return t("SIDEBAR.ARCHIVE");
      case 3:
        return t("SIDEBAR.TRASH");
      case 0:
      default:
        return "";
    }
  }

  return (
    <header
      className={clsx(
        "w-full h-16 border-b dark:border-black p-3 gap-4 transition-colors flex justify-between",
        styles.header
      )}
    >
      <div className="flex justify-start items-center gap-1">
        <MenuIcon />
        <div className="ml-2 select-none">{getActiveSidebarItemTitle()}</div>
      </div>
      <div className="flex justify-end items-center gap-1">
        <LanguageIcon />
        <DarkModeIcon />
      </div>
    </header>
  );
}

function MenuIcon() {
  const { t } = useTranslation();
  const sidebarDispatch = useAppDispatch();

  function handleClickMenuIcon() {
    sidebarDispatch(sidebarAction.changeMode());
  }

  return (
    <div
      className="hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors w-12 h-12 rounded-full cursor-pointer relative select-none"
      onClick={() => {
        handleClickMenuIcon();
      }}
    >
      <div
        className="absolute inset-0 w-fit h-fit m-auto"
        title={t("HEADER.MENU")}
      >
        <Icon.Menu className="fill-black dark:fill-white" />
      </div>
    </div>
  );
}

function LanguageIcon() {
  const { i18n } = useTranslation();

  function changeLanguage() {
    switch (i18n.language) {
      case "zh_cn":
        i18n.changeLanguage("en");
        break;
      case "en":
        i18n.changeLanguage("ja");
        break;
      case "ja":
        i18n.changeLanguage("zh_cn");
        break;
      default:
        return;
    }
  }

  return (
    <div
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 active:bg-gray-100 dark:active:bg-gray-600 flex justify-center items-center cursor-pointer transition-colors"
      onClick={changeLanguage}
    >
      <Icon.Language className="fill-black dark:fill-white" />
    </div>
  );
}

function DarkModeIcon() {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState<boolean>(false);

  function changeTheme() {
    darkMode
      ? document.documentElement.classList.remove("dark")
      : document.documentElement.classList.add("dark");
    setDarkMode(!darkMode);
  }

  return (
    <div
      className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 flex justify-center items-center cursor-pointer transition-colors"
      onClick={changeTheme}
    >
      {darkMode ? (
        <div title={t("SWITCH.TO.DARK.MODE")}>
          <Icon.Moon className="fill-white" />
        </div>
      ) : (
        <div title={t("SWITCH.TO.LIGHT.MODE")}>
          <Icon.Sun />
        </div>
      )}
    </div>
  );
}
