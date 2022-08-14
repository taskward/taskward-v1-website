import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@hooks";
import { sidebarAction } from "@store";
import { Icon } from "@components";

export default function MenuIcon() {
  const { t } = useTranslation(["layout"]);
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
        title={t("layout:HEADER.TITLE.MENU")}
      >
        <Icon.Menu className="fill-black dark:fill-white" />
      </div>
    </div>
  );
}
