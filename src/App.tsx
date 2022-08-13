import { useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, Loading } from "@components";
import { Home, Note, Archive, Trash, NotFound, Login } from "@pages";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { initialThemeMode } from "@utils";

export default function App(): JSX.Element {
  const { i18n } = useTranslation();

  useEffect(() => {
    initialThemeMode();
  }, []);

  return (
    <div className={clsx("dark:text-white", i18n.language)}>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="w-screen h-screen">
              <Loading />
            </div>
          }
        >
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
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
