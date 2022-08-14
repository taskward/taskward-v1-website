import { Suspense } from "react";
import clsx from "clsx";
import { Outlet } from "react-router-dom";
import { Header, Sidebar, Loading } from "..";
import styles from "./styles.module.css";

export default function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <div className={clsx("flex flex-row", styles.mainContentWrapper)}>
        <Sidebar />
        <div
          className={clsx(
            "flex-auto p-6 transition-colors",
            styles.routerContentWrapper
          )}
        >
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  );
}
