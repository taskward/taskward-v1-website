import { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

import { CustomComponentProps } from "@interfaces";
import { useDetectOutsideClick } from "@hooks";

export default function NoteCreator({
  style,
  className,
}: CustomComponentProps): JSX.Element {
  const [editable, setEditable] = useState<boolean>(false);

  const outsideClickRef = useDetectOutsideClick(
    () => {
      setEditable(false);
    },
    () => {
      setEditable(true);
    }
  );

  return (
    <div
      className={clsx(
        "mx-auto shrink-0 rounded-lg border bg-white p-4 ring-0 drop-shadow-lg",
        className
      )}
      style={style}
      ref={outsideClickRef}
    >
      <div className="flex flex-col gap-2 transition-[height] duration-1000">
        {editable ? (
          <>
            <input
              className="w-full font-medium placeholder:text-black focus:outline-none dark:placeholder-gray-400"
              placeholder="标题"
            />
            <div
              className={clsx(
                "min-h-[1.25rem] w-full select-text resize-none whitespace-pre-wrap break-words bg-white px-0 text-sm font-medium outline-none placeholder:text-black empty:before:content-[attr(placeholder)] focus:outline-none dark:bg-gray-800 dark:placeholder-gray-400",
                styles.textarea
              )}
              placeholder="添加记事..."
              contentEditable
            />
          </>
        ) : (
          <input
            className="w-full font-medium placeholder:text-black focus:outline-none dark:placeholder-gray-400"
            placeholder="添加记事..."
          />
        )}
      </div>
    </div>
  );
}
