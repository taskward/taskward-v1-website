import clsx from "clsx";

import { CheckboxProps } from "@interfaces";
import { Icon } from "..";

export default function Checkbox({
  name,
  checkboxTitle,
  className,
  inputClassName,
  inputWrapperClassName,
  register = {},
}: CheckboxProps): JSX.Element {
  return (
    <div className={clsx("flex", className)}>
      <div
        className={clsx(
          "flex h-5 items-center justify-center",
          inputWrapperClassName
        )}
      >
        <input
          id={name}
          type="checkbox"
          name={name}
          className={clsx(
            "mt-[1px] h-4 w-4 shrink-0 cursor-pointer select-none checked:accent-emerald-700",
            inputClassName
          )}
          {...register}
        />
      </div>
      <label
        htmlFor={name}
        className={clsx(
          "ml-2 cursor-pointer text-sm font-normal dark:text-noteSecondTextDark",
          false && "text-gray-500 line-through opacity-75"
        )}
      >
        {checkboxTitle}
      </label>
      <div className="">
        <Icon.Close
          width="20"
          height="20"
          className="invisible hover:visible"
        />
      </div>
    </div>
  );
}
