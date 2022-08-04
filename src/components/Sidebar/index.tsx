import { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import { Icon } from "..";

export default function Sidebar(): JSX.Element {
  const [sidebarMode, setSidebarMode] = useState<"thin" | "fat">("thin");

  return (
    <div
      className={clsx(
        "border-r border-black p-4 relative hover:transition-all transition-all flex flex-col gap-4 items-center",
        styles.sidebarWrapper,
        sidebarMode === "fat" ? "w-52" : "w-20"
      )}
      onMouseOver={() => setSidebarMode("fat")}
      onMouseLeave={() => setSidebarMode("thin")}
    >
      <div className="bg-yellow-100 w-12 h-12 rounded-full cursor-pointer relative">
        <div className="absolute inset-0 w-fit h-fit m-auto">
          <Icon.Bulb width="25" height="25" fill="black" />
        </div>
      </div>
      <div className="bg-yellow-100 w-12 h-12 rounded-full cursor-pointer relative">
        <div className="absolute inset-0 w-fit h-fit m-auto">
          <Icon.Archive width="20" height="20" fill="black" />
        </div>
      </div>
      <div className="bg-yellow-100 w-12 h-12 rounded-full cursor-pointer relative">
        <div className="absolute inset-0 w-fit h-fit m-auto">
          <Icon.Trash width="22" height="22" fill="black" />
        </div>
      </div>
    </div>
  );
}
