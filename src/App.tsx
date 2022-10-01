import { Suspense } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Authentication, Layout, Loading, Notification } from "@components";
import {
  Home,
  Note,
  Archive,
  Trash,
  NotFound,
  Login,
  Signup,
  Icons
} from "@pages";

export default function App(): JSX.Element {
  const { i18n } = useTranslation();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <Authentication>
              <Layout />
              <Notification />
            </Authentication>
          }
        >
          <Route path="note" element={<Note />} />
          <Route path="archive" element={<Archive />} />
          <Route path="trash" element={<Trash />} />
        </Route>
        <Route path="/icons" element={<Icons />} />
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <div
      className={clsx(
        "text-black transition-[background-color] dark:bg-darkMode-darker dark:text-white",
        i18n.language
      )}
    >
      <Suspense fallback={<Loading fullScreen />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}
