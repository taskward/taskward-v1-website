import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

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
        "flex cursor-pointer items-center",
        styles.sidebarItemWrapper,
        active
          ? shouldExpand && "rounded-md bg-emerald-300 dark:bg-emerald-700"
          : shouldExpand &&
              "rounded-md hover:bg-gray-200 dark:hover:bg-gray-500"
      )}
      onClick={onClick}
    >
      <div
        className={clsx(
          "relative h-12 w-12 shrink-0 rounded-full",
          styles.iconWrapper,
          active && !shouldExpand && "bg-emerald-300 dark:bg-emerald-700"
        )}
        title={title}
      >
        <div className="absolute inset-0 m-auto h-fit w-fit">{icon}</div>
      </div>
      {shouldExpand && (
        <span className="duration-0 mx-3 flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </span>
      )}
    </div>
  );
}
