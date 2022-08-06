import { useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import SidebarItem from "./SidebarItem";
import { Icon } from "..";
import { useAppSelector } from "@hooks";

export enum ActiveSideBarItem {
  "Record",
  "Archive",
  "Trash",
}

export default function Sidebar(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const sidebarMode = useAppSelector((state) => state.sidebar.sidebarMode);
  console.log(sidebarMode);

  const [shouldExpand, setShouldExpand] = useState<boolean>(false);
  const [activeSideBarItem, setActiveSideBarItem] = useState<ActiveSideBarItem>(
    ActiveSideBarItem.Record
  );

  function onClickSidebarItem(currentItem: ActiveSideBarItem) {
    setActiveSideBarItem(currentItem);
    if (currentItem === 0) {
      navigate("/");
      return;
    }
    navigate(`/${ActiveSideBarItem[currentItem].toLowerCase()}`);
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
        title={t("SIDEBAR.RECORD")}
        active={activeSideBarItem === ActiveSideBarItem.Record}
        onClick={() => {
          onClickSidebarItem(ActiveSideBarItem.Record);
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
