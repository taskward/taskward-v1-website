import { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import { Icon } from "..";
import { useTranslation } from "react-i18next";
import { isDarkMode } from "../../utils";

export default function Header(): JSX.Element {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState<boolean>(false);

  function changeLanguage() {
    if (i18n.language === "en") {
      i18n.changeLanguage("zh_cn");
    } else {
      i18n.changeLanguage("en");
    }
  }

  function changeTheme() {
    darkMode
      ? document.documentElement.classList.remove("dark")
      : document.documentElement.classList.add("dark");
    setDarkMode(!darkMode);
  }

  return (
    <header
      className={clsx(
        "w-full h-16 border-b dark:border-black px-4 py-3 flex content-center items-center justify-end gap-4",
        styles.header
      )}
    >
      <div></div>
      <div className="flex flex-col items-center text-xs">
        <div className="cursor-pointer" onClick={changeLanguage}>
          <Icon.Language
            width="40"
            height="25"
            fill={isDarkMode() ? "white" : "black"}
          />
        </div>
        <div className="px-1 mt-1">{t("CURRENT.LANGUAGE")}</div>
      </div>
      {darkMode ? (
        <Icon.Moon
          width="24"
          height="24"
          fill="white"
          svgClassName="cursor-pointer"
          onClick={changeTheme}
        />
      ) : (
        <Icon.Sun
          width="24"
          height="24"
          fill="black"
          svgClassName="cursor-pointer"
          onClick={changeTheme}
        />
      )}
    </header>
  );
}
