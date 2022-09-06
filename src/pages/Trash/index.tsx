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

  const { data: trashNotesData, isLoading: isGetTrashNotesLoading } =
    useGetTrashNotesRequest();

  useEffect(() => {
    document.title = getDocumentTitle(t("layout:SIDEBAR.TITLE.TRASH"));
  }, [i18n.language]);

  useEffect(() => {
    sidebarDispatch(
      sidebarAction.changeActiveSidebarItem(ActiveSidebarItem.Trash)
    );
  }, []);

  return (
    <div className="relative flex h-full w-auto flex-col overflow-y-auto">
      {isGetTrashNotesLoading ? (
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
            {trashNotesData?.notes.map((note) => {
              return <TrashNoteListCard key={note.id} note={note} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
