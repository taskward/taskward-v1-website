import clsx from "clsx";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header, Sidebar, Loading } from "..";
import styles from "./styles.module.css";

export default function Layout(): JSX.Element {
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
          </Suspense>
          {/* <Notification
        show={showNotification}
        className="sticky inset-x-0 bottom-10 m-auto"
      >
        {t("common:COPY.SUCCESS")}
      </Notification> */}
        </div>
      </div>
    </>
  );
}
