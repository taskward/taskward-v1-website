import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./styles.module.css";

import { NoteCard } from "@components";
import { getDocumentTitle } from "@utils";
import { useAppDispatch } from "@hooks";
import { sidebarAction, ActiveSidebarItem } from "@store";

export default function Note(): JSX.Element {
  const { t, i18n } = useTranslation(["layout"]);
  const sidebarDispatch = useAppDispatch();

  const [noteList, setNoteList] = useState([
    {
      name: "TODO",
      description: "描述",
    },
    {
      name: "TODO",
      description: "描述",
    },
    {
      name: "TODO",
      description: "描述",
    },
    {
      name: "TODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODO",
      description:
        "描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述",
    },
    {
      name: "TODO",
      description: "描述",
    },
    {
      name: "TODO",
      description: "描述",
    },
    {
      name: "TODO",
      description: "描述",
    },
    {
      name: "TODO",
      description: "描述",
    },
    {
      name: "TODO",
      description: "描述",
    },
    {
      name: "TODO",
      description: "描述",
    },
    {
      name: "TODO",
      description: `1. What is state hoisting\n2. What are falsy values in js\n3. Synchronous vs Asynchronous code\n4. What is a purpose of a Function as a child\n5. Presentational component vs container component\n6. Why do we need keys for React lists\n7. How to recognize closures in js\n8. Difference between using fetch() and axios\n9. Purpose of fragments\n10. How to create a custom hook\n`,
    },
  ]);

  useEffect(() => {
    sidebarDispatch(
      sidebarAction.changeActiveSidebarItem(ActiveSidebarItem.Note)
    );
  }, []);

  useEffect(() => {
    document.title = getDocumentTitle(t("layout:SIDEBAR.TITLE.NOTE"));
  }, [i18n.language]);

  return (
    <div
      className={clsx(
        "flex h-full w-auto flex-col overflow-y-scroll",
        styles.scrollbar
      )}
    >
      <div className="mx-auto w-full p-4">
        <div
          className={clsx(
            "mx-auto h-[60px] shrink-0 rounded-lg border bg-white drop-shadow-lg",
            styles.contentWrapper
          )}
        ></div>
      </div>
      <div className="mx-auto mb-80 w-full p-4">
        {noteList.map((note, index) => {
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
