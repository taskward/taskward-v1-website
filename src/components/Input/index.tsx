import clsx from "clsx";
import { InputProps } from "@interfaces";

export default function Input({
  className,
  type,
  title,
  placeholder,
  required,
}: InputProps): JSX.Element {
  return (
    <div className={className}>
      {title && (
        <span
          className={clsx(
            "block",
            "mb-1",
            "text-sm font-medium text-gray-900 dark:text-gray-300",
            required &&
              "after:content-['*'] after:ml-0.5 after:text-red-500 after:align-middle"
          )}
        >
          {title}
        </span>
      )}
      <input
        type={type}
        className={clsx(
          "block",
          "w-full p-2.5",
          "placeholder-slate-400 dark:placeholder-gray-400",
          "bg-gray-50 dark:bg-gray-700",
          "border border-gray-200 dark:border-gray-600 rounded-md",
          "focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1",
          "text-sm text-gray-900 dark:text-gray-300",
          className
        )}
        placeholder={placeholder}
      />
    </div>
  );
}
