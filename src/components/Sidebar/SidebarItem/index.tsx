import { ReactNode } from "react";
import clsx from "clsx";

type SidebarItemProps = {
  shouldExpand: boolean;
  icon: ReactNode;
  title: string;
  active: boolean;
  onClick: () => void;
};

export default function SidebarItem({
  shouldExpand,
  icon,
  title,
  active,
  onClick,
}: SidebarItemProps): JSX.Element {
  return (
    <div
      className={clsx(
        "flex items-center cursor-pointer select-none",
        active
          ? shouldExpand &&
              "bg-emerald-300 dark:bg-emerald-700 rounded-md transition-all ease-in-out"
          : shouldExpand &&
              "hover:bg-gray-200 dark:hover:bg-gray-500 hover:rounded-md transition-all ease-in-out"
      )}
      onClick={onClick}
    >
      <div
        className={clsx(
          "w-12 h-12 rounded-full relative shrink-0 transition-all duration-300 ease-in-out",
          active && !shouldExpand && "bg-emerald-300 dark:bg-emerald-700"
        )}
        title={title}
      >
        <div className="absolute inset-0 w-fit h-fit m-auto icon">{icon}</div>
      </div>
      {shouldExpand && (
        <div className="flex-grow ml-3 whitespace-nowrap">{title}</div>
      )}
    </div>
  );
}