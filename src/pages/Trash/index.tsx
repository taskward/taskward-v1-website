import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getDocumentTitle } from "@utils";
import { useAppDispatch } from "@hooks";
import { sidebarAction, ActiveSidebarItem } from "@store";

export default function Trash(): JSX.Element {
  const { t, i18n } = useTranslation(["layout"]);
  const sidebarDispatch = useAppDispatch();

  useEffect(() => {
    sidebarDispatch(
      sidebarAction.changeActiveSidebarItem(ActiveSidebarItem.Trash)
    );
  }, []);

  useEffect(() => {
    document.title = getDocumentTitle(t("layout:SIDEBAR.TITLE.TRASH"));
  }, [i18n.language]);

  return <></>;
}
