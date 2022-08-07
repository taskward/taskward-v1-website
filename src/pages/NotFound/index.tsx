import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getDocumentTitle } from "@utils";
import { useAppDispatch } from "@hooks";
import { sidebarAction, ActiveSidebarItem } from "@store";
import taskward from "@assets/img/taskward.png";

export default function NotFound(): JSX.Element {
  const { t, i18n } = useTranslation();
  const sidebarDispatch = useAppDispatch();

  useEffect(() => {
    sidebarDispatch(
      sidebarAction.changeActiveSidebarItem(ActiveSidebarItem.None)
    );
  }, []);

  useEffect(() => {
    document.title = getDocumentTitle(t("404.NOTFOUND"));
  }, [i18n.language]);

  return (
    <div className="w-full h-full flex justify-center items-center select-none">
      <div className="mb-24 flex justify-center items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <Link to="/">
            <img
              src={taskward}
              loading="eager"
              width="96"
              height="96"
              className="animate-bounce"
            />
          </Link>
          <div className="text-md">Taskward</div>
        </div>
        <div className="text-5xl animate-pulse">404 {t("404.NOTFOUND")}</div>
      </div>
    </div>
  );
}