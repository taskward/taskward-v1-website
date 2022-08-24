import clsx from "clsx";
import { InputProps } from "@interfaces";

export default function Input({
  className,
  inputClassName,
  inputWrapperClassName,
  type,
  inputTitle,
  placeholder,
  autoComplete = "off",
  maxLength,
  required,
  defaultValue = undefined,
  register = {},
  rightIcon,
  error,
  errorMessage,
}: InputProps): JSX.Element {
  return (
    <div className={className}>
      {inputTitle && (
        <span
          className={clsx(
            "block",
            "mb-1",
            "text-sm font-medium text-gray-900 dark:text-gray-300",
            required &&
              "after:ml-0.5 after:align-middle after:text-red-500 after:content-['*']"
          )}
        >
          {inputTitle}
        </span>
      )}
      <div className={inputWrapperClassName}>
        <input
          type={type}
          className={clsx(
            "block",
            "w-full p-2.5",
            "placeholder-slate-400 dark:placeholder-gray-400",
            "bg-gray-50 dark:bg-gray-700",
            "rounded-md border focus:outline-none focus:ring-1",
            "text-sm text-gray-900 dark:text-gray-300",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500"
              : "border-gray-200 focus:border-sky-500 focus:ring-sky-500 dark:border-gray-600",
            inputClassName
          )}
          placeholder={placeholder}
          autoComplete={autoComplete}
          maxLength={maxLength}
          defaultValue={defaultValue}
          {...register}
        />
        {rightIcon && <>{rightIcon}</>}
      </div>
      <div
        className={clsx(
          "block select-none text-xs font-medium text-red-600 transition-opacity",
          error ? "visible mt-1 opacity-100" : "invisible h-0 opacity-0"
        )}
      >
        {errorMessage}
      </div>
    </div>
  );
}
