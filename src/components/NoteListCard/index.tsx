import { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { Icon } from "@components";
import {
  useArchiveNoteRequest,
  useDeleteNoteRequest,
  useUnarchiveNoteRequest,
} from "@requests";
import {
  convertUtcToLocalTime,
  convertUtcToFullLocalTime,
  setClipBoardText,
} from "@utils";
import { useAppDispatch, useToggle } from "@hooks";
import { sidebarAction, ActiveSidebarItem } from "@store";
import { NoteListCardProps } from "@interfaces";

import EditNoteModal from "./EditNoteModal";

export default function NoteListCard({
  note,
  type = "note",
  className,
  style,
}: NoteListCardProps): JSX.Element | null {
  const { t } = useTranslation(["common", "layout", "note"]);

  const { mutate: archiveNote, isLoading: isArchiveNoteLoading } =
    useArchiveNoteRequest();
  const { mutate: deleteNote, isLoading: isDeleteNoteLoading } =
    useDeleteNoteRequest();
  const { mutate: unarchiveNote, isLoading: isUnarchiveNoteLoading } =
    useUnarchiveNoteRequest();
  const [isEdit, toggleEdit] = useToggle(false);

  const [focused, setFocused] = useState<boolean>(false);

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
    <>
      <div
        key={note.id}
        className={clsx(
          "mx-auto flex h-fit w-full cursor-pointer flex-col gap-4 rounded-md border border-gray-200 bg-white pt-4 transition-[visibility,opacity] dark:border-neutral-800 dark:bg-noteDark",
          className,
          focused
            ? "drop-shadow-lg dark:drop-shadow-[0_10px_8px_#3a3d41]"
            : "drop-shadow-sm",
          isEdit ? "invisible opacity-0" : "visible opacity-100"
        )}
        style={style}
        onClick={() => {
          toggleEdit();
          setFocused(false);
        }}
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
            title={convertUtcToFullLocalTime(note.createdAt)}
          >
            {convertUtcToLocalTime(note.createdAt)}
          </div>
          <div
            className={clsx(
              "flex items-center gap-1 transition-[colors,transform,opacity,visibility] duration-500",
              focused
                ? "visible scale-100 opacity-100"
                : "invisible scale-0 opacity-0"
            )}
          >
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
            {type === "note" ? (
              <div
                title={t("layout:SIDEBAR.TITLE.ARCHIVE")}
                onClick={(e) => {
                  e.stopPropagation();
                  archiveNote(note.id);
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
            ) : (
              <div
                title={t("note:UNARCHIVE")}
                onClick={(e) => {
                  e.stopPropagation();
                  unarchiveNote(note.id);
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
            <div
              title={t("common:DELETE")}
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(note.id);
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
          </div>
        </div>
      </div>
      <EditNoteModal isEdit={isEdit} toggle={toggleEdit} note={note} />
    </>
  );
}
