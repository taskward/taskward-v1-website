import { useTranslation } from "react-i18next";
import { Icon } from "@components";
import { useAppSelector, useAppDispatch } from "@hooks";
import { styleAction, ThemeMode } from "@store";

export default function ThemeModeButton() {
  const { t } = useTranslation(["layout"]);
  const styleDispatch = useAppDispatch();

  const darkMode = useAppSelector<ThemeMode>((state) => state.style.themeMode);

  function changeThemeMode() {
    if (darkMode === "dark") {
      styleDispatch(styleAction.updateUserInfo("light"));
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      styleDispatch(styleAction.updateUserInfo("dark"));
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  return (
    <div
      className="flex cursor-pointer items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-500"
      onClick={changeThemeMode}
    >
      {darkMode === "light" ? (
        <div title={t("layout:HEADER.TITLE.SWITCH.TO.LIGHT.MODE")}>
          <Icon.Sun />
        </div>
      ) : (
        <div title={t("layout:HEADER.TITLE.SWITCH.TO.DARK.MODE")}>
          <Icon.Moon className="fill-white" />
        </div>
      )}
    </div>
  );
}
