import { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import { Icon } from "..";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@hooks";
import { sidebarAction } from "@store";

export default function Header(): JSX.Element {
  return (
    <header
      className={clsx(
        "w-full h-16 border-b dark:border-black p-3 gap-4 transition-colors flex justify-between",
        styles.header
      )}
    >
      <div className="flex justify-start items-center gap-2">
        <MenuIcon />
      </div>
      <div className="flex justify-end items-center gap-2">
        <LanguageIcon />
        <DarkModeIcon />
      </div>
    </header>
  );
}

function MenuIcon() {
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
      <div className="absolute inset-0 w-fit h-fit m-auto">
        <Icon.Menu className="fill-black dark:fill-white" />
      </div>
    </div>
  );
}

function LanguageIcon() {
  const { t, i18n } = useTranslation();

  function changeLanguage() {
    if (i18n.language === "en") {
      i18n.changeLanguage("zh_cn");
    } else {
      i18n.changeLanguage("en");
    }
  }

  return (
    <div className="flex flex-col items-center text-xs">
      <div className="cursor-pointer" onClick={changeLanguage}>
        <Icon.Language
          width="40"
          height="25"
          className="fill-black dark:fill-white"
        />
      </div>
      <div className="px-1 mt-1 select-none">{t("CURRENT.LANGUAGE")}</div>
    </div>
  );
}

function DarkModeIcon() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  function changeTheme() {
    darkMode
      ? document.documentElement.classList.remove("dark")
      : document.documentElement.classList.add("dark");
    setDarkMode(!darkMode);
  }

  return (
    <div
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 flex justify-center items-center cursor-pointer transition-colors"
      onClick={changeTheme}
    >
      {darkMode ? (
        <Icon.Moon width="20" height="20" className="fill-white" />
      ) : (
        <Icon.Sun width="20" height="20" />
      )}
    </div>
  );
}
