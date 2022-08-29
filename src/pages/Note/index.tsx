import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./styles.module.css";

import { NoteCard, NoteCreator, Loading, Icon } from "@components";
import { useGetNotesRequest } from "@requests";
import {
  getDocumentTitle,
  convertUtcToLocalTime,
  convertUtcToFullLocalTime,
  setClipBoardText,
} from "@utils";
import { useAppDispatch } from "@hooks";
import { sidebarAction, ActiveSidebarItem } from "@store";

export default function Note(): JSX.Element {
  const { t, i18n } = useTranslation(["layout"]);
  const sidebarDispatch = useAppDispatch();

  const { data: notesData, isLoading, isRefetching } = useGetNotesRequest();

  useEffect(() => {
    document.title = getDocumentTitle(t("layout:SIDEBAR.TITLE.NOTE"));
  }, [i18n.language]);

  useEffect(() => {
    sidebarDispatch(
      sidebarAction.changeActiveSidebarItem(ActiveSidebarItem.Note)
    );
  }, []);

  return (
    <div
      className={clsx(
        "flex h-full w-auto flex-col overflow-y-scroll",
        styles.scrollbar
      )}
    >
      <div className="mx-auto mt-4 w-full p-4">
        <NoteCreator className={styles.contentWrapper} />
      </div>
      <div className="mx-auto mb-80 w-full p-4">
        {isLoading || isRefetching ? (
          <Loading />
        ) : (
          notesData?.notes.map((note, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  "mx-auto mb-4 flex h-fit flex-col gap-4 rounded-md border border-gray-200 bg-slate-100 drop-shadow-sm dark:bg-slate-800",
                  styles.contentWrapper
                )}
              >
                <div className="block truncate px-4 pt-4 text-lg font-medium">
                  {note.name}
                </div>
                <p
                  className="block whitespace-pre-wrap break-words px-4 text-sm font-normal tracking-wide"
                  dangerouslySetInnerHTML={{ __html: note.description }}
                />

                <div
                  className="flex items-center justify-end px-4 text-xs font-medium"
                  title={convertUtcToFullLocalTime(note.createdAt)}
                >
                  {convertUtcToLocalTime(note.createdAt)}
                </div>
                <div className="flex items-center gap-1 px-2 pb-2">
                  <div
                    onClick={() => {
                      setClipBoardText(note.description);
                    }}
                    className="flex h-fit w-fit cursor-pointer select-none items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-500 dark:active:bg-gray-600"
                  >
                    <Icon.Copy
                      width="18"
                      height="18"
                      className="fill-black dark:fill-white"
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
