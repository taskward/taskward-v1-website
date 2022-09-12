import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./styles.module.css";

import { NoteListCard, Loading } from "@components";
import { useGetArchiveNotesRequest } from "@requests";
import { getDocumentTitle } from "@utils";
import { useAppDispatch } from "@hooks";
import { sidebarAction, ActiveSidebarItem } from "@store";
import { Note as NoteType } from "@interfaces";

export default function Archive(): JSX.Element {
  const { t, i18n } = useTranslation(["common", "layout"]);
  const sidebarDispatch = useAppDispatch();

  const { data: notesData, isLoading: isGetArchiveNotesLoading } =
    useGetArchiveNotesRequest();

  useEffect(() => {
    document.title = getDocumentTitle(t("layout:SIDEBAR.TITLE.ARCHIVE"));
  }, [i18n.language]);

  useEffect(() => {
    sidebarDispatch(
      sidebarAction.changeActiveSidebarItem(ActiveSidebarItem.Archive)
    );
  }, []);

  return (
    <div className="relative flex h-full w-auto flex-col overflow-y-auto">
      {isGetArchiveNotesLoading ? (
        <div className="h-screen">
          <Loading />
        </div>
      ) : (
        <div className="mx-auto mb-80 w-full p-4">
          <div
            className={clsx(
              "mx-auto flex flex-col items-center justify-center gap-4",
              styles.contentWrapper
            )}
          >
            {notesData?.notes.map((note: NoteType) => {
              return <NoteListCard key={note.id} note={note} type="archive" />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
