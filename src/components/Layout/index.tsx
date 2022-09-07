import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import clsx from "clsx";

import styles from "./styles.module.css";

import { Header, Sidebar, Loading } from "..";

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
        </div>
      </div>
    </>
  );
}
