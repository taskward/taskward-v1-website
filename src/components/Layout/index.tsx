import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useAppSelector } from "@hooks";

import styles from "./styles.module.css";

import { Header, Sidebar, Loading, Notification } from "..";

export default function Layout(): JSX.Element {
  const { t } = useTranslation(["common"]);
  const showNotification = useAppSelector((state) => state.notification.show);
  const notificationText = useAppSelector((state) => state.notification.text);

  return (
    <>
      <Header />
      <div
        className={clsx(
          "flex w-full flex-row overflow-hidden",
          styles.mainContentWrapper
        )}
      >
        <Sidebar />
        <div
          className={clsx(
            "w-full overflow-hidden transition-[background-color]",
            styles.routerContentWrapper
          )}
        >
          <Suspense fallback={<Loading />}>
            <Outlet />
            <Notification
              show={showNotification}
              className="sticky inset-x-0 bottom-10 m-auto"
            >
              {t(notificationText ?? "")}
            </Notification>
          </Suspense>
        </div>
      </div>
    </>
  );
}
