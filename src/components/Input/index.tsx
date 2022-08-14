import clsx from "clsx";
import { type HTMLInputTypeAttribute } from "react";

type InputProps = {
  className?: string;
  type?: HTMLInputTypeAttribute;
  title?: string;
  placeholder?: string;
};

export default function Input({
  className,
  type,
  title,
  placeholder,
}: InputProps): JSX.Element {
  return (
    <div className={className}>
      {title && (
        <label className="block mb-1 text-sm font-medium">{title}</label>
      )}
      <input
        type={type}
        className={clsx(
          "bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white",
          className
        )}
        placeholder={placeholder}
      />
    </div>
  );
}
