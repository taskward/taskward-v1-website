import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./styles.module.css";

import { NoteListCard, NoteCreator, Loading } from "@components";
import { useGetNotesRequest } from "@requests";
import { getDocumentTitle } from "@utils";
import { useAppDispatch } from "@hooks";
import { sidebarAction, ActiveSidebarItem } from "@store";

export default function Note(): JSX.Element {
  const { t, i18n } = useTranslation(["common", "layout"]);
  const sidebarDispatch = useAppDispatch();

  const {
    data: notesData,
    isLoading: isGetNotesLoading,
    isRefetching: isGetNotesRefetching,
  } = useGetNotesRequest();

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
        "relative flex h-full w-auto flex-col overflow-y-scroll",
        styles.scrollbar
      )}
    >
      <div className="mx-auto mt-4 w-full p-4">
        <NoteCreator className={styles.contentWrapper} />
      </div>
      <div className="mx-auto mb-80 w-full p-4">
        {isGetNotesLoading ? (
          <Loading />
        ) : (
          <div
            className={clsx(
              "mx-auto flex flex-col items-center justify-center gap-4",
              styles.contentWrapper
            )}
          >
            {notesData?.notes.map((note) => {
              return <NoteListCard key={note.id} note={note} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
