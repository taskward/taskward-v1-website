import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@hooks";
import { sidebarAction } from "@store";
import { Icon } from "@components";

export default function MenuIcon(): JSX.Element {
  const { t } = useTranslation(["layout"]);
  const sidebarDispatch = useAppDispatch();

  function handleClickMenuIcon() {
    sidebarDispatch(sidebarAction.changeMode());
  }

  return (
    <div
      className="relative h-12 w-12 cursor-pointer select-none rounded-full transition-colors hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600"
      onClick={() => {
        handleClickMenuIcon();
      }}
    >
      <div
        className="absolute inset-0 m-auto h-fit w-fit"
        title={t("layout:HEADER.TITLE.MENU")}
      >
        <Icon.Menu className="fill-black dark:fill-white" />
      </div>
    </div>
  );
}
