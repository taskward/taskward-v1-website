import { Suspense } from "react";
import clsx from "clsx";
import { Outlet } from "react-router-dom";
import { Header, Sidebar, Loading } from "..";
import styles from "./styles.module.css";

export default function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <div className={clsx("flex w-full flex-row", styles.mainContentWrapper)}>
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
        </div>
      </div>
    </>
  );
}
