import clsx from "clsx";
import { CSSProperties } from "react";

type ButtonProps = {
  icon?: JSX.Element;
  title?: string;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  block?: boolean;
  disabled?: boolean;
};

export default function Button({
  icon,
  title,
  onClick,
  className,
  style,
  block = false,
  disabled = false,
}: ButtonProps): JSX.Element {
  return (
    <button
      style={style}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "cursor-pointer rounded-md bg-gradient-to-br from-emerald-300 to-emerald-600 py-2 px-3 text-center font-medium text-white shadow-sm shadow-emerald-800 transition-colors hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300",
        block ? "w-full" : "w-fit",
        className
      )}
    >
      <span className="text-md flex items-center justify-center gap-1 whitespace-nowrap">
        {icon}
        {title}
      </span>
    </button>
  );
}
