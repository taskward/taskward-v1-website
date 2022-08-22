import clsx from "clsx";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@hooks";
import LanguageIcon from "./LanguageButton";
import ThemeModeIcon from "./ThemeModeIcon";
import MenuIcon from "./MenuIcon";
import UserAvatar from "./UserAvatar";

export default function Header(): JSX.Element {
  const { t } = useTranslation(["layout"]);
  const activeSidebarItem = useAppSelector(
    (state) => state.sidebar.activeSidebarItem
  );

  function getActiveSidebarItemTitle(): string {
    switch (activeSidebarItem) {
      case 1:
        return t("layout:SIDEBAR.TITLE.NOTE");
      case 2:
        return t("layout:SIDEBAR.TITLE.ARCHIVE");
      case 3:
        return t("layout:SIDEBAR.TITLE.TRASH");
      case 0:
      default:
        return "";
    }
  }

  return (
    <header
      className={clsx(
        "w-full h-16 border-b dark:border-black p-3 gap-4 transition-all flex justify-between select-none",
        styles.header
      )}
    >
      <div className="flex justify-start items-center gap-1">
        <MenuIcon />
        <div className="ml-2">{getActiveSidebarItemTitle()}</div>
      </div>
      <div className="flex justify-end items-center gap-1 mr-2">
        <LanguageIcon />
        <ThemeModeIcon />
        <UserAvatar />
      </div>
    </header>
  );
}
