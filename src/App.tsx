import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Authentication, Layout, Loading } from "@components";
import { Home, Note, Archive, Trash, NotFound, Login, Signup } from "@pages";

export default function App(): JSX.Element {
  const { i18n } = useTranslation();

  return (
    <div className={clsx("text-black dark:text-white", i18n.language)}>
      <BrowserRouter>
        <Suspense fallback={<Loading fullScreen />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <Authentication>
                  <Layout />
                </Authentication>
              }
            >
              <Route path="note" element={<Note />} />
              <Route path="archive" element={<Archive />} />
              <Route path="trash" element={<Trash />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
