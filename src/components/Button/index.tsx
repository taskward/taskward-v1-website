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
        "font-medium transition-colors shadow-sm shadow-emerald-800 text-center py-2 px-3 cursor-pointer rounded-md text-white bg-gradient-to-br from-emerald-300 to-emerald-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300",
        block ? "w-full" : "w-fit",
        className
      )}
    >
      <span className="whitespace-nowrap text-md flex items-center justify-center gap-1">
        {icon}
        {title}
      </span>
    </button>
  );
}
