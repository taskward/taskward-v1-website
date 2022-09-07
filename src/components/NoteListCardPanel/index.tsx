import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { Icon } from "@components";
import { setClipBoardText } from "@utils";
import { NoteListCardPanelProps } from "@interfaces";

export default function NoteListCardPanel({
  focused,
  note,
  copy,
  archive,
  archiveLoading,
  unarchive,
  unarchiveLoading,
  softDelete,
  softDeleteLoading,
  restore,
  restoreLoading,
  forceDelete,
  forceDeleteLoading,
}: NoteListCardPanelProps): JSX.Element | null {
  const { t } = useTranslation(["common", "layout", "note"]);

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
      className={clsx(
        "flex items-center gap-1 transition-[colors,transform,opacity,visibility] duration-500",
        focused
          ? "visible scale-100 opacity-100"
          : "invisible scale-0 opacity-0"
      )}
    >
      {copy && (
        <div
          title={t("common:COPY")}
          onClick={(e) => {
            e.stopPropagation();
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
      )}
      {archive && (
        <div
          title={t("layout:SIDEBAR.TITLE.ARCHIVE")}
          onClick={(e) => {
            if (archiveLoading) {
              return;
            }
            e.stopPropagation();
            archive(note.id);
          }}
          className={clsx(
            "flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600"
          )}
        >
          <Icon.Archive
            width="22"
            height="22"
            className="fill-black dark:fill-white"
          />
        </div>
      )}
      {unarchive && (
        <div
          title={t("note:UNARCHIVE")}
          onClick={(e) => {
            if (unarchiveLoading) {
              return;
            }
            e.stopPropagation();
            unarchive(note.id);
          }}
          className={clsx(
            "flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600"
          )}
        >
          <Icon.Unarchive
            width="22"
            height="22"
            className="fill-black dark:fill-white"
          />
        </div>
      )}
      {softDelete && (
        <div
          title={t("common:DELETE")}
          onClick={(e) => {
            if (softDeleteLoading) {
              return;
            }
            e.stopPropagation();
            softDelete(note.id);
          }}
          className={clsx(
            "flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600"
          )}
        >
          <Icon.Delete
            width="26"
            height="26"
            className="fill-black dark:fill-white"
          />
        </div>
      )}
      {restore && (
        <div
          title={t("common:RESTORE")}
          onClick={(e) => {
            if (restoreLoading) {
              return;
            }
            e.stopPropagation();
            restore(note.id);
          }}
          className={clsx(
            "flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600"
          )}
        >
          <Icon.RestoreFromTrash
            width="26"
            height="26"
            className="fill-black dark:fill-white"
          />
        </div>
      )}
      {forceDelete && (
        <div
          title={t("common:DELETE.FOREVER")}
          onClick={(e) => {
            if (forceDeleteLoading) {
              return;
            }
            e.stopPropagation();
            forceDelete(note.id);
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
      )}
    </div>
  );
}
