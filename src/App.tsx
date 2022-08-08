import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@components";
import { Note, Archive, Trash, NotFound } from "@pages";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export default function App(): JSX.Element {
  const { i18n } = useTranslation();
  return (
    <div className={clsx("dark:text-white", i18n.language)}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Note />} />
            <Route path="note" element={<Note />} />
            <Route path="archive" element={<Archive />} />
            <Route path="trash" element={<Trash />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
