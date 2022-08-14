import { useTranslation } from "react-i18next";
import { Icon } from "@components";
import { useAppSelector, useAppDispatch } from "@hooks";
import { styleAction } from "@store";
import { ThemeMode } from "../../../store/styleSlice";

export default function ThemeModeIcon() {
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
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 flex justify-center items-center cursor-pointer transition-colors"
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
