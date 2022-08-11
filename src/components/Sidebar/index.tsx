import { useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import SidebarItem from "./SidebarItem";
import { Icon } from "@components";
import { useAppSelector } from "@hooks";
import { ActiveSidebarItem } from "@store";

export default function Sidebar(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sidebarMode = useAppSelector((state) => state.sidebar.sidebarMode);
  const activeSidebarItem = useAppSelector(
    (state) => state.sidebar.activeSidebarItem
  );

  const [shouldExpand, setShouldExpand] = useState<boolean>(false);

  function onClickSidebarItem(currentItem: ActiveSidebarItem) {
    switch (true) {
      case currentItem > 0:
        navigate(`/${ActiveSidebarItem[currentItem].toLowerCase()}`);
      default:
        return;
    }
  }

  return (
    <div
      className={clsx(
        "border-r dark:border-black p-3 relative flex flex-col gap-3 overflow-hidden transition-all",
        styles.sidebarWrapper,
        sidebarMode === "collapse" && !shouldExpand
          ? styles.collapse
          : styles.expand
      )}
      onMouseOver={() => {
        sidebarMode === "collapse" && setShouldExpand(true);
      }}
      onMouseLeave={() => {
        sidebarMode === "collapse" && setShouldExpand(false);
      }}
    >
      <SidebarItem
        shouldExpand={
          sidebarMode === "expand" ||
          (shouldExpand && sidebarMode === "collapse")
        }
        icon={<Icon.Note className="fill-black dark:fill-white" />}
        title={t("SIDEBAR.NOTE")}
        active={activeSidebarItem === ActiveSidebarItem.Note}
        onClick={() => {
          onClickSidebarItem(ActiveSidebarItem.Note);
        }}
      />
      <SidebarItem
        shouldExpand={
          sidebarMode === "expand" ||
          (shouldExpand && sidebarMode === "collapse")
        }
        icon={<Icon.Archive className="fill-black dark:fill-white" />}
        title={t("SIDEBAR.ARCHIVE")}
        active={activeSidebarItem === ActiveSidebarItem.Archive}
        onClick={() => {
          onClickSidebarItem(ActiveSidebarItem.Archive);
        }}
      />
      <SidebarItem
        shouldExpand={
          sidebarMode === "expand" ||
          (shouldExpand && sidebarMode === "collapse")
        }
        icon={<Icon.Trash className="fill-black dark:fill-white" />}
        title={t("SIDEBAR.TRASH")}
        active={activeSidebarItem === ActiveSidebarItem.Trash}
        onClick={() => {
          onClickSidebarItem(ActiveSidebarItem.Trash);
        }}
      />
    </div>
  );
}
