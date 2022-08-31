import { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { Icon } from "@components";
import {
  useDeleteTrashNoteRequest,
  useRestoreTrashNoteRequest,
} from "@requests";
import {
  convertUtcToLocalTime,
  convertUtcToFullLocalTime,
  setClipBoardText,
} from "@utils";
import { useAppDispatch } from "@hooks";
import { sidebarAction, ActiveSidebarItem } from "@store";
import { TrashNoteListCardProps } from "@interfaces";

export default function TrashNoteListCard({
  note,
  className,
  style,
}: TrashNoteListCardProps): JSX.Element | null {
  const { t } = useTranslation(["common"]);

  const [focused, setFocused] = useState<boolean>(false);

  const { mutate: restoreTrashNote, isLoading: isRestoreTrashNoteLoading } =
    useRestoreTrashNoteRequest();
  const { mutate: deleteTrashNote, isLoading: isDeleteTrashNoteLoading } =
    useDeleteTrashNoteRequest();

  const copyDescription = (text: string | undefined | null) => {
    const copyResult = setClipBoardText(text);
    if (copyResult) {
      // setShowNotification(true);
      setTimeout(() => {
        // setShowNotification(false);
      }, 5000);
    }
  };

  if (!note) {
    return null;
  }

  return (
    <div
      key={note.id}
      className={clsx(
        "mx-auto flex h-fit w-full flex-col gap-4 rounded-md border border-gray-200 bg-white pt-4 dark:border-neutral-800 dark:bg-noteDark",
        className,
        focused
          ? "drop-shadow-lg dark:drop-shadow-[0_10px_8px_#3a3d41]"
          : "drop-shadow-sm"
      )}
      style={style}
      onMouseEnter={() => {
        setFocused(true);
      }}
      onMouseLeave={() => {
        setFocused(false);
      }}
    >
      {note.name && (
        <div className="block truncate px-4 text-lg font-medium">
          {note.name}
        </div>
      )}
      <p
        className="block whitespace-pre-wrap break-words px-4 text-sm font-normal tracking-wide dark:text-noteSecondTextDark"
        dangerouslySetInnerHTML={{ __html: note.description }}
      />
      <div className="flex flex-col px-2 pb-2">
        <div
          className="flex items-center justify-end px-2 text-xs font-medium dark:text-noteSecondTextDark"
          title={convertUtcToFullLocalTime(note.deletedAt)}
        >
          {convertUtcToLocalTime(note.deletedAt)}
        </div>
        <div
          className={clsx(
            "flex items-center gap-1 transition-[colors,transform,opacity] duration-500",
            focused
              ? "visible scale-100 opacity-100"
              : "invisible scale-0 opacity-0"
          )}
        >
          <div
            title={t("common:COPY")}
            onClick={() => {
              copyDescription(note.description);
            }}
            className={clsx(
              "flex h-10 w-10 select-none items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600",
              note.description ? "cursor-pointer" : "cursor-not-allowed"
            )}
          >
            <Icon.Copy
              width="18"
              height="18"
              className="fill-black dark:fill-white"
            />
          </div>
          <div
            title={t("common:DELETE.FOREVER")}
            onClick={() => {
              deleteTrashNote(note.id);
            }}
            className={clsx(
              "flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600"
            )}
          >
            <Icon.DeleteForever
              width="26"
              height="26"
              className="fill-black dark:fill-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
