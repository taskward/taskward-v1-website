import { useState, useEffect } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import SidebarItem from "./SidebarItem";
import { Icon } from "..";
import { useAppSelector, useAppDispatch } from "@hooks";
import { sidebarAction } from "@store";

export enum ActiveSideBarItem {
  "Note",
  "Archive",
  "Trash",
}

export default function Sidebar(): JSX.Element {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const sidebarDispatch = useAppDispatch();

  const sidebarMode = useAppSelector((state) => state.sidebar.sidebarMode);

  const [shouldExpand, setShouldExpand] = useState<boolean>(false);
  const [activeSideBarItem, setActiveSideBarItem] = useState<ActiveSideBarItem>(
    ActiveSideBarItem.Note
  );

  useEffect(() => {
    changeDocumentTitle(activeSideBarItem);
  }, [activeSideBarItem, i18n.language]);

  function onClickSidebarItem(currentItem: ActiveSideBarItem) {
    setActiveSideBarItem(currentItem);
    switch (currentItem) {
      case ActiveSideBarItem.Note:
        sidebarDispatch(sidebarAction.changeCurrentTitleKey("SIDEBAR.NOTE"));
        break;
      case ActiveSideBarItem.Archive:
        sidebarDispatch(sidebarAction.changeCurrentTitleKey("SIDEBAR.ARCHIVE"));
        break;
      case ActiveSideBarItem.Trash:
        sidebarDispatch(sidebarAction.changeCurrentTitleKey("SIDEBAR.TRASH"));
        break;
    }
    if (currentItem === 0) {
      navigate("/");
      return;
    }
    navigate(`/${ActiveSideBarItem[currentItem].toLowerCase()}`);
  }

  function changeDocumentTitle(activeSideBarItem: ActiveSideBarItem) {
    switch (activeSideBarItem) {
      case ActiveSideBarItem.Note:
        document.title = t("SIDEBAR.NOTE") + " | Taskward";
        break;
      case ActiveSideBarItem.Archive:
        document.title = t("SIDEBAR.ARCHIVE") + " | Taskward";
        break;
      case ActiveSideBarItem.Trash:
        document.title = t("SIDEBAR.TRASH") + " | Taskward";
        break;
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
        icon={<Icon.Bulb className="fill-black dark:fill-white" />}
        title={t("SIDEBAR.NOTE")}
        active={activeSideBarItem === ActiveSideBarItem.Note}
        onClick={() => {
          onClickSidebarItem(ActiveSideBarItem.Note);
        }}
      />
      <SidebarItem
        shouldExpand={
          sidebarMode === "expand" ||
          (shouldExpand && sidebarMode === "collapse")
        }
        icon={<Icon.Archive className="fill-black dark:fill-white" />}
        title={t("SIDEBAR.ARCHIVE")}
        active={activeSideBarItem === ActiveSideBarItem.Archive}
        onClick={() => {
          onClickSidebarItem(ActiveSideBarItem.Archive);
        }}
      />
      <SidebarItem
        shouldExpand={
          sidebarMode === "expand" ||
          (shouldExpand && sidebarMode === "collapse")
        }
        icon={<Icon.Trash className="fill-black dark:fill-white" />}
        title={t("SIDEBAR.TRASH")}
        active={activeSideBarItem === ActiveSideBarItem.Trash}
        onClick={() => {
          onClickSidebarItem(ActiveSideBarItem.Trash);
        }}
      />
    </div>
  );
}
