import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
      name: "TODO",
      description: "描述",
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
    <div className="flex h-full flex-col">
      <div className="mx-auto my-4 h-[100px] w-[600px] rounded-lg bg-white drop-shadow-lg"></div>
      <div className="flex w-full flex-wrap overflow-y-scroll scroll-smooth bg-slate-200 p-2">
        <div className="m-6 h-[300px] w-[200px] bg-slate-100">123</div>
        <div className="m-6 h-[300px] w-[200px] bg-slate-100">123</div>
        <div className="m-6 h-[400px] w-[200px] bg-slate-100">123</div>
        <div className="m-6 h-[500px] w-[200px] bg-slate-100">123</div>
        <div className="m-6 h-[700px] w-[200px] bg-slate-100">123</div>
        <div className="m-6 h-[300px] w-[200px] bg-slate-100">123</div>
        <div className="m-6 h-[300px] w-[200px] bg-slate-100">123</div>
        <div className="m-6 h-[400px] w-[200px] bg-slate-100">123</div>
        <div className="m-6 h-[300px] w-[200px] bg-slate-100">123</div>
        <div className="m-6 h-[300px] w-[200px] bg-slate-100">123</div>
        <div className="m-6 h-[500px] w-[200px] bg-slate-100">123</div>
        <div className="m-6 h-[300px] w-[200px] bg-slate-100">123</div>
      </div>
    </div>
  );
}
