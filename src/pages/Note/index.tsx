import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./styles.module.css";

import { NoteCard, NoteCreator, Loading } from "@components";
import { useGetNotesRequest } from "@requests";
import { getDocumentTitle, convertUtcToLocalTime } from "@utils";
import { useAppDispatch } from "@hooks";
import { sidebarAction, ActiveSidebarItem } from "@store";

export default function Note(): JSX.Element {
  const { t, i18n } = useTranslation(["layout"]);
  const sidebarDispatch = useAppDispatch();

  const { data: notesData, isLoading } = useGetNotesRequest();

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
        {isLoading ? (
          <Loading />
        ) : (
          notesData?.notes.map((note, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  "mx-auto mb-4 flex h-fit flex-col gap-1 rounded-md border border-gray-200 bg-slate-100 p-4 drop-shadow-sm dark:bg-slate-800",
                  styles.contentWrapper
                )}
              >
                <div className="block truncate text-lg font-medium">
                  {note.name}
                </div>
                <p
                  className="block whitespace-pre-wrap break-words text-sm font-normal"
                  dangerouslySetInnerHTML={{ __html: note.description }}
                />
                <div>{convertUtcToLocalTime(note.updatedAt)}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
