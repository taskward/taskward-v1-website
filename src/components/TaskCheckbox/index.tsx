import { useRef, useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

import { TaskCheckboxProps } from "@interfaces";
import { Icon } from "@components";

export default function TaskCheckbox({
  name,
  checkboxTitle,
  url,
  checked,
  className,
  inputClassName,
  inputWrapperClassName,
  register = {},
  removeTask,
  changeChecked,
  changeContent,
}: TaskCheckboxProps): JSX.Element {
  const [showClose, setShowClose] = useState<boolean>(false);
  const ref = useRef<any>();

  return (
    <div
      className={clsx("flex", className)}
      onMouseEnter={(e) => {
        e.stopPropagation();
        setShowClose(true);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        setShowClose(false);
      }}
    >
      <div
        className={clsx(
          "flex h-5 w-5 shrink-0 items-center justify-center",
          inputWrapperClassName
        )}
      >
        <input
          ref={ref}
          id={name}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => {
            e.stopPropagation();
            changeChecked && changeChecked();
          }}
          className={clsx(
            "mt-[1px] h-4 w-4 cursor-pointer select-none checked:accent-emerald-700",
            inputClassName
          )}
          {...register}
        />
      </div>
      <div
        className={clsx(
          styles.inputWidth,
          "mx-2 cursor-text select-text whitespace-pre-wrap break-words text-sm font-normal tracking-wide outline-none dark:text-noteSecondTextDark",
          checked && "text-gray-500 line-through opacity-75"
        )}
        contentEditable
        onInput={(e) => {
          changeContent && changeContent(e.currentTarget.textContent ?? "");
        }}
        dangerouslySetInnerHTML={{ __html: checkboxTitle ?? "" }}
        onFocus={(e) => {
          e.stopPropagation();
          setShowClose(true);
        }}
        onBlur={(e) => {
          e.stopPropagation();
          setShowClose(false);
        }}
      />
      <div
        className={clsx(
          "flex h-5 w-5 shrink-0 cursor-pointer select-none items-center justify-center rounded-full p-0.5 transition-[visibility,opacity,background-color] hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600",
          showClose ? "visible opacity-100" : "invisible opacity-0"
        )}
        onClick={() => {
          removeTask && removeTask();
        }}
      >
        <Icon.Close
          width="20"
          height="20"
          className="fill-black dark:fill-white"
        />
      </div>
    </div>
  );
}
