import { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

export default function Sidebar(): JSX.Element {
  const [sidebarMode, setSidebarMode] = useState<"thin" | "fat">("fat");

  function changeSidebarMode() {
    if (sidebarMode === "thin") {
      setSidebarMode("fat");
    } else {
      setSidebarMode("thin");
    }
  }

  return (
    <div
      className={clsx(
        "border-r border-black p-2 relative",
        styles.sidebarWrapper,
        sidebarMode === "fat" ? "w-52" : "w-24"
      )}
    >
      侧边栏
      <button
        className="bg-blue-400 rounded-md p-2 text-center absolute bottom-4 inset-x-0 text-xs mx-auto w-fit"
        onClick={changeSidebarMode}
      >
        更换模式
      </button>
    </div>
  );
}
