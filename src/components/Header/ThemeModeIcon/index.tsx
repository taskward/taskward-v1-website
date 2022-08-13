import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@components";
import { isDarkMode } from "@utils";

export default function ThemeModeIcon() {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState<boolean>(isDarkMode());

  function changeTheme() {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  }

  return (
    <div
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 flex justify-center items-center cursor-pointer transition-colors"
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
