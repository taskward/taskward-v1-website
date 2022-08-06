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
    <div className="flex items-center" onClick={onClick}>
      <div
        className={clsx(
          "hover:bg-emerald-300 dark:hover:bg-emerald-700 transition-colors w-12 h-12 rounded-full cursor-pointer relative shrink-0",
          active && "bg-emerald-300 dark:bg-emerald-700"
        )}
        title={title}
      >
        <div className="absolute inset-0 w-fit h-fit m-auto">{icon}</div>
      </div>
      {shouldExpand && (
        <div className="flex-grow ml-3 whitespace-nowrap select-none">
          {title}
        </div>
      )}
    </div>
  );
}
