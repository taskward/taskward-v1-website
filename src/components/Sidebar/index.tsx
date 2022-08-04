import { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import { Icon } from "..";
import { useTranslation } from "react-i18next";

export default function Sidebar(): JSX.Element {
  const { t } = useTranslation();

  const [sidebarMode, setSidebarMode] = useState<"thin" | "fat">("fat");

  return (
    <div
      className={clsx(
        "border-r border-black p-3 relative hover:transition-all transition-all flex flex-col gap-4",
        styles.sidebarWrapper,
        sidebarMode === "fat" ? "w-40" : "w-20 items-center"
      )}
      onMouseOver={() => setSidebarMode("fat")}
      onMouseLeave={() => setSidebarMode("thin")}
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
        {sidebarMode === "fat" && (
          <div className="flex-grow text-center ml-3">
            {t("SIDEBAR.RECORD")}
          </div>
        )}
      </div>

      <div className="flex flex-row items-center">
        <div
          className="bg-yellow-100 w-12 h-12 rounded-full cursor-pointer relative shrink-0"
          title={t("SIDEBAR.ARCHIVE")}
        >
          <div className="absolute inset-0 w-fit h-fit m-auto">
            <Icon.Archive width="20" height="20" fill="black" />
          </div>
        </div>
        {sidebarMode === "fat" && (
          <div className="flex-grow text-center ml-3">
            {t("SIDEBAR.ARCHIVE")}
          </div>
        )}
      </div>

      <div className="flex flex-row items-center">
        <div
          className="bg-yellow-100 w-12 h-12 rounded-full cursor-pointer relative shrink-0"
          title={t("SIDEBAR.TRASH")}
        >
          <div className="absolute inset-0 w-fit h-fit m-auto">
            <Icon.Trash width="22" height="22" fill="black" />
          </div>
        </div>
        {sidebarMode === "fat" && (
          <div className="flex-grow text-center ml-3">{t("SIDEBAR.TRASH")}</div>
        )}
      </div>
    </div>
  );
}
