import { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./styles.module.css";

import { TaskCheckboxProps } from "@interfaces";
import { Icon } from "@components";
import { openWindow, setClipBoardText } from "@utils";

export default function TaskCheckbox({
  name,
  checkboxTitle,
  linkUrl,
  checked,
  editable,
  draggable,
  className,
  inputClassName,
  inputWrapperClassName,
  register = {},
  removeTask,
  changeChecked,
  changeContent,
  changeLinkUrl,
}: TaskCheckboxProps): JSX.Element {
  const { t } = useTranslation(["note"]);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [showClose, setShowClose] = useState<boolean>(false);
  const [linkEditable, setLinkEditable] = useState<boolean>(
    typeof linkUrl === "string"
  );
  const [content, setContent] = useState<string | undefined | null>(
    checkboxTitle
  );

  return (
    <div
      className={clsx(
        "flex flex-col gap-1 transition-[visibility,opacity]",
        dragOver ? "invisible opacity-0" : "visible opacity-100",
        className
      )}
      draggable={draggable}
      onDragStart={(e) => {
        e.stopPropagation();
        setDragOver(true);
      }}
      onDragEnd={(e) => {
        e.stopPropagation();
        setDragOver(false);
      }}
      onMouseEnter={(e) => {
        e.stopPropagation();
        setShowClose(true);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        setShowClose(false);
      }}
    >
      <div className="flex gap-2">
        <div
          className={clsx(
            "flex h-5 w-5 shrink-0 items-center justify-center",
            inputWrapperClassName
          )}
        >
          <input
            id={name}
            type="checkbox"
            name={name}
            checked={checked}
            onClick={(e) => {
              e.stopPropagation();
            }}
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
            "cursor-pointer select-text whitespace-pre-wrap break-words text-sm font-normal tracking-wide outline-none placeholder:text-gray-500 empty:before:text-gray-500 empty:before:content-[attr(placeholder)] dark:text-noteSecondTextDark dark:placeholder-gray-400",
            checked && content && "text-gray-500 line-through opacity-75",
            editable && "cursor-auto"
          )}
          contentEditable={editable}
          onInput={(e) => {
            e.stopPropagation();
            changeContent && changeContent(e.currentTarget.textContent);
            setContent(e.currentTarget.textContent);
          }}
          placeholder={
            editable ? t("note:TASK.PLACEHOLDER.CONTENT") : undefined
          }
          dangerouslySetInnerHTML={{ __html: checkboxTitle ?? "" }}
        />
        {editable && (
          <div className="flex shrink-0 gap-0.5">
            {linkEditable ? (
              <div
                className={clsx(
                  "flex h-5 w-5 cursor-pointer select-none items-center justify-center rounded-full p-0.5 transition-[visibility,opacity,background-color,transform] hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600",
                  showClose
                    ? "visible scale-100 opacity-100"
                    : "invisible scale-0 opacity-0"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setLinkEditable(false);
                  changeLinkUrl && changeLinkUrl(null);
                }}
              >
                <Icon.LinkOff
                  width="18"
                  height="18"
                  className="fill-black dark:fill-white"
                />
              </div>
            ) : (
              <div
                className={clsx(
                  "flex h-5 w-5 cursor-pointer select-none items-center justify-center rounded-full p-0.5 transition-[visibility,opacity,background-color,transform] hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600",
                  showClose
                    ? "visible scale-100 opacity-100"
                    : "invisible scale-0 opacity-0"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setLinkEditable(true);
                  changeLinkUrl && changeLinkUrl("");
                }}
              >
                <Icon.AddLink
                  width="18"
                  height="18"
                  className="fill-black dark:fill-white"
                />
              </div>
            )}
            <div
              className={clsx(
                "flex h-5 w-5 cursor-pointer select-none items-center justify-center rounded-full p-0.5 transition-[visibility,opacity,background-color,transform] hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600",
                showClose
                  ? "visible scale-100 opacity-100"
                  : "invisible scale-0 opacity-0"
              )}
              onClick={(e) => {
                e.stopPropagation();
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
        )}
      </div>
      {linkEditable && (
        <div className="ml-7 flex gap-2">
          <div className="flex h-5 w-5 items-center justify-center">
            <Icon.Link width="20" height="20" className="fill-emerald-600" />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (editable) {
                return;
              }
              linkUrl && openWindow(linkUrl);
            }}
            className={clsx(
              editable
                ? "cursor-text placeholder:text-xs placeholder:text-gray-500 empty:before:text-gray-500 empty:before:content-[attr(placeholder)] dark:text-noteSecondTextDark dark:placeholder-gray-400"
                : "cursor-pointer hover:text-emerald-600 hover:underline active:text-emerald-300 dark:hover:text-emerald-600 dark:active:text-emerald-300",
              "grow select-text whitespace-pre-wrap break-words text-xs font-normal leading-5 tracking-wide outline-none dark:text-noteSecondTextDark"
            )}
            placeholder={editable ? t("note:TASK.PLACEHOLDER.LINK") : undefined}
            contentEditable={editable}
            onInput={(e) => {
              e.stopPropagation();
              changeLinkUrl && changeLinkUrl(e.currentTarget.textContent);
            }}
            dangerouslySetInnerHTML={{ __html: linkUrl ?? "" }}
          />
          <div className="flex shrink-0 gap-0.5">
            <div
              className={clsx(
                "flex h-5 w-5 cursor-pointer select-none items-center justify-center rounded-full p-0.5 transition-[visibility,opacity,background-color,transform] hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600",
                showClose
                  ? "visible scale-100 opacity-100"
                  : "invisible scale-0 opacity-0"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setClipBoardText(linkUrl);
              }}
            >
              <Icon.Copy
                width="13"
                height="13"
                className="fill-black dark:fill-white"
              />
            </div>
            <div
              className={clsx(
                "flex h-5 w-5 cursor-pointer select-none items-center justify-center rounded-full p-0.5 transition-[visibility,opacity,background-color,transform] hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600",
                showClose
                  ? "visible scale-100 opacity-100"
                  : "invisible scale-0 opacity-0"
              )}
              onClick={(e) => {
                e.stopPropagation();
                linkUrl && openWindow(linkUrl);
              }}
            >
              <Icon.OpenLink
                width="14"
                height="14"
                className="fill-black dark:fill-white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
