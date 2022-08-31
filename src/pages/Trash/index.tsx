import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./styles.module.css";

import { TrashNoteListCard, Loading } from "@components";
import { getDocumentTitle } from "@utils";
import { useAppDispatch } from "@hooks";
import { sidebarAction, ActiveSidebarItem } from "@store";
import { useGetTrashNotesRequest } from "@requests";

export default function Trash(): JSX.Element {
  const { t, i18n } = useTranslation(["common", "layout"]);
  const sidebarDispatch = useAppDispatch();

  const {
    data: trashNotesData,
    isLoading: isGetTrashNotesLoading,
    isRefetching: isGetTrashNotesRefetching,
  } = useGetTrashNotesRequest();

  useEffect(() => {
    document.title = getDocumentTitle(t("layout:SIDEBAR.TITLE.TRASH"));
  }, [i18n.language]);

  useEffect(() => {
    sidebarDispatch(
      sidebarAction.changeActiveSidebarItem(ActiveSidebarItem.Trash)
    );
  }, []);

  return (
    <div
      className={clsx(
        "relative flex h-full w-auto flex-col overflow-y-scroll",
        styles.scrollbar
      )}
    >
      <div className="mx-auto mt-4 mb-80 w-full p-4">
        {isGetTrashNotesLoading || isGetTrashNotesRefetching ? (
          <Loading />
        ) : (
          <div
            className={clsx(
              "mx-auto flex flex-col items-center justify-center gap-4",
              styles.contentWrapper
            )}
          >
            {trashNotesData?.notes.map((note) => {
              return <TrashNoteListCard key={note.id} note={note} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
