import { ReactNode } from "react";
import { type SidebarMode } from "..";

type SidebarItemProps = {
  sidebarMode: SidebarMode;
  icon: ReactNode;
  title: string;
};

export default function SidebarItem({
  sidebarMode,
  icon,
  title,
}: SidebarItemProps): JSX.Element {
  return (
    <div className="flex flex-row items-center">
      <div
        className="hover:bg-emerald-300 dark:hover:bg-emerald-700 transition-colors w-12 h-12 rounded-full cursor-pointer relative shrink-0"
        title={title}
      >
        <div className="absolute inset-0 w-fit h-fit m-auto">{icon}</div>
      </div>
      {sidebarMode === "expand" && (
        <div className="flex-grow ml-3 whitespace-nowrap select-none">
          {title}
        </div>
      )}
    </div>
  );
}
