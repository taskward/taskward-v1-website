import { useEffect, Suspense } from "react";
import clsx from "clsx";
import { Outlet, useNavigate } from "react-router-dom";
import { Header, Sidebar, Loading } from "..";
import styles from "./styles.module.css";
import { isLogin } from "@utils";

export default function Layout(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus: boolean = isLogin();
    if (!loginStatus) {
      navigate("/login");
    }
  }, []);

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
