import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./styles.module.css";

import {
  NoteCard,
  NoteCreator,
  Loading,
  Icon,
  Notification,
} from "@components";
import {
  useDeleteNoteRequest,
  useGetNotesRequest,
  useUpdateNoteRequest,
} from "@requests";
import {
  getDocumentTitle,
  convertUtcToLocalTime,
  convertUtcToFullLocalTime,
  setClipBoardText,
} from "@utils";
import { useAppDispatch } from "@hooks";
import { sidebarAction, ActiveSidebarItem } from "@store";

export default function Note(): JSX.Element {
  const { t, i18n } = useTranslation(["layout", "common"]);
  const sidebarDispatch = useAppDispatch();

  const {
    data: notesData,
    isLoading: isGetNotesLoading,
    isRefetching: isGetNotesRefetching,
  } = useGetNotesRequest();
  const { mutate: updateNote, isLoading: isUpdateNoteLoading } =
    useUpdateNoteRequest();
  const { mutate: deleteNote, isLoading: isDeleteNoteLoading } =
    useDeleteNoteRequest();

  const [focusNoteId, setFocusNoteId] = useState<null | number>(null);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  useEffect(() => {
    document.title = getDocumentTitle(t("layout:SIDEBAR.TITLE.NOTE"));
  }, [i18n.language]);

  useEffect(() => {
    sidebarDispatch(
      sidebarAction.changeActiveSidebarItem(ActiveSidebarItem.Note)
    );
  }, []);

  const copyDescription = (text: string | undefined | null) => {
    const copyResult = setClipBoardText(text);
    if (copyResult) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
  };

  return (
    <div
      className={clsx(
        "relative flex h-full w-auto flex-col overflow-y-scroll",
        styles.scrollbar
      )}
    >
      <div className="mx-auto mt-4 w-full p-4">
        <NoteCreator className={styles.contentWrapper} />
      </div>
      <div className="mx-auto mb-80 w-full p-4">
        {isGetNotesLoading || isGetNotesRefetching || isDeleteNoteLoading ? (
          <Loading />
        ) : (
          notesData?.notes.map((note) => {
            return (
              <div
                key={note.id}
                className={clsx(
                  "mx-auto mb-4 flex h-fit flex-col gap-4 rounded-md border border-gray-200 bg-white pt-4 dark:border-neutral-800 dark:bg-noteDark",
                  styles.contentWrapper,
                  note.id === focusNoteId ? "drop-shadow-lg" : "drop-shadow-sm"
                )}
                onMouseEnter={() => {
                  setFocusNoteId(note.id);
                }}
                onMouseLeave={() => {
                  setFocusNoteId(null);
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
                      "flex items-center gap-1",
                      note.id === focusNoteId
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                    )}
                  >
                    <div
                      title={t("common:COPY")}
                      onClick={() => {
                        copyDescription(note.description);
                      }}
                      className={clsx(
                        "flex h-10 w-10 select-none items-center justify-center rounded-full p-2 transition-[colors,transform,opacity] duration-500 hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600",
                        note.description
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      )}
                    >
                      <Icon.Copy
                        width="18"
                        height="18"
                        className="fill-black dark:fill-white"
                      />
                    </div>
                    <div
                      onClick={() => {
                        if (focusNoteId && focusNoteId > 0) {
                          deleteNote(focusNoteId);
                        }
                      }}
                      className={clsx(
                        "flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full p-2 transition-[colors,transform,opacity] duration-500 hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600"
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
            );
          })
        )}
      </div>
      <Notification
        show={showNotification}
        className="sticky inset-x-0 bottom-10 m-auto"
      >
        {t("common:COPY.SUCCESS")}
      </Notification>
    </div>
  );
}
