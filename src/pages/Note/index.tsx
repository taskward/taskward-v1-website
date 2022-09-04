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
  const { t, i18n } = useTranslation(["common", "layout", "note"]);
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
    <div className="relative flex h-full w-auto flex-col overflow-y-auto">
      <div className="mx-auto mb-80 flex w-full flex-col gap-4 p-4">
        <NoteCreator className={styles.contentWrapper} />
        {isGetNotesLoading ? (
          <Loading />
        ) : (
          <div
            className={clsx(
              "mx-auto flex flex-col items-center justify-center gap-4",
              styles.contentWrapper
            )}
          >
            <div className="text-xs font-medium dark:text-noteSecondTextDark">
              {notesData?.count && notesData.count > 0 ? (
                <>{t("note:NOTE.COUNT", { count: notesData.count })} 🎉</>
              ) : (
                <>{t("note:NOTE.NONE")} 👆</>
              )}
            </div>

            {notesData?.notes.map((note) => {
              return <NoteListCard key={note.id} note={note} type="note" />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
