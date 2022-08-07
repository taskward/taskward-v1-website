import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getDocumentTitle } from "@utils";
import { useAppDispatch } from "@hooks";
import { sidebarAction, ActiveSidebarItem } from "@store";

export default function Archive(): JSX.Element {
  const { t, i18n } = useTranslation();
  const sidebarDispatch = useAppDispatch();

  useEffect(() => {
    sidebarDispatch(
      sidebarAction.changeActiveSidebarItem(ActiveSidebarItem.Archive)
    );
  }, []);

  useEffect(() => {
    document.title = getDocumentTitle(t("SIDEBAR.ARCHIVE"));
  }, [i18n.language]);

  return <>{t("SIDEBAR.ARCHIVE")}</>;
}
