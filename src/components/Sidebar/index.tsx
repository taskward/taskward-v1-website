import { useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.css";
import SidebarItem from "./SidebarItem";
import { Icon } from "..";

export type SidebarMode = "collapse" | "expand";

export default function Sidebar(): JSX.Element {
  const { t } = useTranslation();

  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("expand");

  return (
    <div
      className={clsx(
        "border-r dark:border-black p-3 relative flex flex-col gap-4 overflow-hidden",
        styles.sidebarWrapper,
        sidebarMode === "collapse" ? "w-18" : "w-56"
      )}
      onMouseOver={() => setSidebarMode("expand")}
      onMouseLeave={() => setSidebarMode("collapse")}
    >
      <div className="flex flex-row items-center">
        <div
          className={clsx(
            "bg-yellow-100 w-12 h-12 rounded-full cursor-pointer relative shrink-0 hover:bg-slate-300 hover:rounded-lg hover:transition-all hover:ease-in-out transition-all duration-1000",
            styles.bulbWrapper
          )}
          title={t("SIDEBAR.RECORD")}
        >
          <div className="absolute inset-0 w-fit h-fit m-auto">
            <Icon.Bulb
              width="25"
              height="25"
              fill="black"
              svgClassName={styles.bulb}
            />
          </div>
        </div>
        {sidebarMode === "expand" && (
          <div className="flex-grow text-center ml-3 whitespace-nowrap">
            {t("SIDEBAR.RECORD")}
          </div>
        )}
      </div>
      <SidebarItem
        sidebarMode={sidebarMode}
        icon={
          <Icon.Bulb
            width="25"
            height="25"
            fill="black"
            svgClassName={styles.bulb}
          />
        }
        title={t("SIDEBAR.RECORD")}
      />
      <SidebarItem
        sidebarMode={sidebarMode}
        icon={<Icon.Archive width="20" height="20" fill="black" />}
        title={t("SIDEBAR.ARCHIVE")}
      />
      <SidebarItem
        sidebarMode={sidebarMode}
        icon={<Icon.Trash width="22" height="22" fill="black" />}
        title={t("SIDEBAR.TRASH")}
      />
    </div>
  );
}
